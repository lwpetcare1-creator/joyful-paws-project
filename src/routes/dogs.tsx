import { createFileRoute } from '@tanstack/react-router';
import { ShopPage, CatalogueError } from '@/components/shop-page';
import { catalogueOptions } from '@/lib/catalogue.functions';
import { meta } from '@/lib/store';
export const Route=createFileRoute('/dogs')({staticData:{sitemap:true},head:()=>meta('Shop for dogs','Explore genuine pet food, treats and essentials at Louis Wilson Pet Care, Delhi.','/dogs'),loader:({context})=>context.queryClient.ensureQueryData(catalogueOptions),errorComponent:CatalogueError,notFoundComponent:CatalogueError,component:Page});
function Page(){return <ShopPage title="Shop for dogs" pet="dog"/>}
