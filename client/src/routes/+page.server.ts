import type { PageServerLoad, Actions} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    throw redirect(302, "/home");
}

export const actions : Actions =  {
    setTheme: async ({url, cookies}) => {
        const theme = url.searchParams.get("theme");
        if (theme) {
            cookies.set("colortheme", theme, {
                path : "/",
                maxAge: 60 * 60 * 24 * 365 * 10,
            });
        }
    }
}