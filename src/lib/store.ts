import dogShelf from '@/assets/shelf-1.jpg.asset.json';
import catShelf from '@/assets/shelf-2.jpg.asset.json';
import treatShelf from '@/assets/shelf-4.jpg.asset.json';
import careShelf from '@/assets/shelf-5.jpg.asset.json';
import toyShelf from '@/assets/shelf-6.jpg.asset.json';
export const whatsapp = 'https://wa.me/919217962828';
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style:'currency',currency:'INR',maximumFractionDigits:0 }).format(value);
export const categories = [
 {name:'Dog Food',slug:'dog-food',image:dogShelf.url}, {name:'Cat Food',slug:'cat-food',image:catShelf.url}, {name:'Treats & Chews',slug:'treats',image:treatShelf.url}, {name:'Toys & Accessories',slug:'toys',image:toyShelf.url}, {name:'Grooming & Care',slug:'grooming-care',image:careShelf.url}, {name:'Vet Diets',slug:'vet-diets',image:dogShelf.url},
];
export const brands=['Royal Canin','Acana','Orijen','Farmina N&D','Purepet','Chip Chops','JerHigh','First Bark','Twistix','Goodies','Milky Chew','Calcium Milk Bone','Denta Spiral','POW','Softy','Rena Pizza','Woof Brew'];
export const siteOrigin = 'https://joyful-paws-project.lovable.app';
export const meta=(title:string,description:string,path:string,options:{noindex?:boolean}={})=>({
 meta:[{title:`${title} | L.W Pet Care`},{name:'description',content:description},{property:'og:title',content:`${title} | L.W Pet Care`},{property:'og:description',content:description},{property:'og:type',content:'website'},{property:'og:url',content:siteOrigin+path},{name:'twitter:card',content:'summary_large_image'},...(options.noindex?[{name:'robots',content:'noindex, follow'}]:[])],
 links:[{rel:'canonical',href:siteOrigin+path}]
});
