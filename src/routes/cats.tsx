import { createFileRoute } from '@tanstack/react-router';
import { ShopPage, CatalogueError } from '@/components/shop-page';
import { catalogueOptions } from '@/lib/catalogue.functions';
import { meta } from '@/lib/store';
export const Route=createFileRoute('/cats')({head:()=>meta('Shop for cats','Explore genuine pet food, treats and essentials at Louis Wilson Pet Care, Delhi.'),loader:({context})=>context.queryClient.ensureQueryData(catalogueOptions),errorComponent:CatalogueError,notFoundComponent:CatalogueError,component:Page});
function Page(){return <ShopPage title="Shop for cats" pet="cat"/>}
