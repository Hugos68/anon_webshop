import '$lib/supabase';
import type { Handle } from '@sveltejs/kit';
import {getSupabase} from '@supabase/auth-helpers-sveltekit';
import {sequence} from "@sveltejs/kit/hooks";

const handleRedirectToLocalHost: Handle = async ({ event, resolve }) => {
    const url = new URL(event.request.url)
    if (url.hostname.startsWith('127.0.0.1')) {
        url.hostname = 'localhost'
        return Response.redirect(url.toString(), 302)
    }
    return resolve(event);
};

const handleConsentCookie: Handle = async ({ resolve, event }) => {

    const consentCookie = event.cookies.get("cookieconsent");
    if (!consentCookie) {
        event.cookies.delete('colortheme');
        event.cookies.delete('supabase-auth-token');
        event.cookies.delete('shopping-cart');
    }
    else {
        event.locals.consentCookie = JSON.parse(consentCookie) as ConsentCookie;
    }
    return resolve(event);
};


const handleAuth: Handle =  async ({event, resolve}) => {
    const { session, supabaseClient } = await getSupabase(event);
    event.locals.sb = supabaseClient;
    event.locals.session = session;
    return resolve(event);
};

const handleTheme: Handle = async ({event, resolve}) => {
    const newTheme = event.url.searchParams.get("theme");
    const cookieTheme: string | undefined = event.cookies.get('colortheme');
    const theme : string = newTheme || cookieTheme || "dark";

    event.locals.theme = theme;

    return resolve(event, {
        transformPageChunk: ({html}) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
};

export const handle: Handle = sequence(handleRedirectToLocalHost, handleConsentCookie, handleAuth, handleTheme);

