import type {Actions, PageServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";
import {arePersonalizedCookiesAllowed} from "$lib/util";

export const load: PageServerLoad = async () => {
    throw redirect(302, "/home");
}
export const actions: Actions = {
    setTheme: async ({ url, cookies }) => {
        if (!arePersonalizedCookiesAllowed()) return;
        const theme = url.searchParams.get("theme");
        if (theme) {
            cookies.set("colortheme", theme, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 10,
            });
        }
    },
    setCookieConsent: async ({url, cookies}) => {
        const cookieConsent = url.searchParams.get("cookies");
        if (cookieConsent) {
            cookies.set("cookieconsent", cookieConsent, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 10,
            });
        }
    }
};