import {createFileRoute,Link} from '@tanstack/react-router';
import {meta} from '@/lib/store';
import {Button} from '@/components/ui/button';
export const Route=createFileRoute('/checkout')({head:()=>meta('Checkout','Secure checkout for your pet essentials at L.W Pet Care.'),component:Checkout});
function Checkout(){return <main className="wrap section"><div className="page-head"><h1>Checkout</h1><p>Your bag is empty. Online ordering opens once our inventory is ready.</p><Button asChild><Link to="/dogs">Explore the store</Link></Button></div></main>}
