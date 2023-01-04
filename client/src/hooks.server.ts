import '$lib/supabase';
import type {Handle} from '@sveltejs/kit';
import {getSupabase} from '@supabase/auth-helpers-sveltekit';

export const handle: Handle = async ({event, resolve}) => {
    const { session, supabaseClient } = await getSupabase(event);

    event.locals.sb = supabaseClient;
    event.locals.session = session;

    let theme : string | undefined;
    const newTheme = event.url.searchParams.get("theme");
    const cookieTheme: string | undefined = event.cookies.get('colortheme');
    theme = newTheme || cookieTheme;

    if (theme) {
        return resolve(event, {
            transformPageChunk: ({html}) => html.replace('data-theme=""', `data-theme="${theme}"`)
        });
    }

    // If no theme was found, default to dark
    return resolve(event, {
        transformPageChunk: ({html}) => html.replace('data-theme=""', 'data-theme="dark"')
    });

}