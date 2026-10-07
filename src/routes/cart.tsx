import {createFileRoute,Link} from '@tanstack/react-router';
import {ShoppingBag} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {meta} from '@/lib/store';
export const Route=createFileRoute('/cart')({head:()=>meta('Shopping bag','Review your shopping bag at L.W Pet Care.'),component:Cart});
function Cart(){return <main className="wrap section"><div className="page-head"><h1>Your shopping bag</h1></div><div className="empty-state mb-10"><ShoppingBag size={44}/><h2>A little room for happiness</h2><p>Your bag is empty. Explore our store or ask us to help find your pet’s favourites.</p><Button asChild><Link to="/dogs">Explore the store</Link></Button></div></main>}
