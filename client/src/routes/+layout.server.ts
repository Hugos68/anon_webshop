import type {Actions, LayoutServerLoad} from './$types';
import {getServerSession} from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
    return {
        session : await getServerSession(event),
        theme : event.cookies.get("colortheme") || 'dark',
        consentCookie: event.cookies.get("cookieconsent")
    }
}

