import '$lib/supabase';
import type {Handle} from '@sveltejs/kit';
import {getSupabase} from '@supabase/auth-helpers-sveltekit';
import {sequence} from "@sveltejs/kit/hooks";

const redirectToLocalhost = (async ({ event, resolve }) => {
    const url = new URL(event.request.url)
    if (url.hostname.startsWith('127.0.0.1')) {
        url.hostname = 'localhost'
        return Response.redirect(url.toString(), 302)
    }
    return resolve(event)
}) satisfies Handle

const handleAuth =  (async ({event, resolve}) => {
    const { session, supabaseClient } = await getSupabase(event);
    event.locals.sb = supabaseClient;
    event.locals.session = session;
    return resolve(event);
}) satisfies Handle

const setTheme = (async ({event, resolve}) => {
    const newTheme = event.url.searchParams.get("theme");
    const cookieTheme: string | undefined = event.cookies.get('colortheme');
    const theme : string | undefined = newTheme || cookieTheme;

    if (theme) {
        return resolve(event, {
            transformPageChunk: ({html}) => html.replace('data-theme=""', `data-theme="${theme}"`)
        });
    }
    // If no theme was found, default to dark
    return resolve(event, {
        transformPageChunk: ({html}) => html.replace('data-theme=""', 'data-theme="dark"')
    });
}) satisfies Handle

export const handle: Handle = sequence(redirectToLocalhost, handleAuth, setTheme);

