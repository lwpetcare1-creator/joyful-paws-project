import { createFileRoute } from '@tanstack/react-router';
import { ShopPage, CatalogueError } from '@/components/shop-page';
import { catalogueOptions } from '@/lib/catalogue.functions';
import { meta } from '@/lib/store';
export const Route=createFileRoute('/brand/$name')({head:({params})=>meta(params.name.replace(/-/g,' '),'Explore '+params.name.replace(/-/g,' ')+' at L.W Pet Care. Genuine pet essentials in Delhi.'),loader:({context})=>context.queryClient.ensureQueryData(catalogueOptions),errorComponent:CatalogueError,notFoundComponent:CatalogueError,component:Page});
function Page(){const {name}=Route.useParams();return <ShopPage title={name==='all'?'All brands':name.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())} brand={name}/>}
