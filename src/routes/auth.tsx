import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account-page';
import {meta} from '@/lib/store';
export const Route=createFileRoute('/auth')({head:()=>meta('Sign in','Join the L.W Pet Care family. Sign in or create your account with email or Google.'),component:AccountPage});
