import type {LayoutServerLoad} from './$types';
import {getServerSession} from '@supabase/auth-helpers-sveltekit';
import type { Cookies } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
    return {
        session : await getServerSession(event),
        theme : event.cookies.get("colortheme") || 'dark',
        consentCookie: getConsentCookie(event.cookies)
    };
}

const getConsentCookie = (cookies: Cookies) => {
    const consentCookie = cookies.get("consentcookie");
    if (!consentCookie) return undefined;
    return JSON.parse(consentCookie);
}