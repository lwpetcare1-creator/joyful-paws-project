import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
export const getCatalogue=createServerFn({method:'GET'}).handler(async()=>{
 const key=process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY']; const url=process.env['SUPABASE_URL'];
 if(!key||!url)throw new Error('The catalogue is temporarily unavailable.');
 const db=createClient<Database>(url,key,{auth:{persistSession:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_')&&h.get('Authorization')===`Bearer ${key}`)h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h})}}});
 const {data,error}=await db.from('products').select('*, product_variants(*)').eq('status','published');if(error)throw error;return data;
});
export const catalogueOptions={queryKey:['catalogue'],queryFn:()=>getCatalogue()};
export const getAdminData=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:admin,error:roleError}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(roleError||!admin)throw new Error('Owner access has not been granted to this account.');
 const [products,orders,profiles]=await Promise.all([context.supabase.from('products').select('*, product_variants(*)').order('created_at',{ascending:false}),context.supabase.from('orders').select('*').order('created_at',{ascending:false}),context.supabase.from('profiles').select('*')]);
 if(products.error||orders.error||profiles.error)throw new Error('Unable to load store records.');return {products:products.data,orders:orders.data,customers:profiles.data};
});
const productInput=z.object({id:z.string().uuid().optional(),name:z.string().min(2),slug:z.string().min(2).regex(/^[a-z0-9-]+$/),brand:z.string(),category:z.string(),pet_type:z.string(),life_stage:z.string(),description:z.string(),status:z.enum(['draft','published']),image_url:z.string().optional(),pack_size:z.string(),price:z.number().nullable(),mrp:z.number().nullable(),stock:z.number().int().min(0),sku:z.string()});
export const saveProduct=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((data:unknown)=>productInput.parse(data)).handler(async({context,data})=>{
 const {data:admin}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(!admin)throw new Error('Owner access required.');
 if(data.status==='published'&&(!data.pack_size||!data.price||!data.mrp))throw new Error('Add a pack size, MRP and selling price before publishing.');
 const {id,pack_size,price,mrp,stock,sku,...product}=data;
 const request=id?context.supabase.from('products').update(product).eq('id',id):context.supabase.from('products').insert(product);
 const {data:row,error}=await request.select('id').single();if(error)throw error;
 const {data:existing,error:readError}=await context.supabase.from('product_variants').select('id').eq('product_id',row.id).limit(1);if(readError)throw readError;
 const variant={product_id:row.id,pack_size,price,mrp,stock,sku:sku||null};const previous=existing?.[0];const result=previous?await context.supabase.from('product_variants').update(variant).eq('id',previous.id):await context.supabase.from('product_variants').insert(variant);if(result.error)throw result.error;return row;
});
export const removeProduct=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((data:unknown)=>z.object({id:z.string().uuid()}).parse(data)).handler(async({context,data})=>{const {data:admin}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(!admin)throw new Error('Owner access required.');const {error}=await context.supabase.from('products').delete().eq('id',data.id);if(error)throw error;return true;});
