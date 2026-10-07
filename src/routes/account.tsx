import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account-page';
import {meta} from '@/lib/store';
export const Route=createFileRoute('/account')({staticData:{sitemap:false},head:()=>meta('My account','Sign in to Louis Wilson Pet Care to manage your orders, profile and saved delivery addresses.','/account',{noindex:true}),component:AccountPage});
