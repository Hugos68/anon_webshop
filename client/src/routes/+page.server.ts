import type {Actions, PageServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    throw redirect(302, "/home");
}
export const actions: Actions = {
    setTheme: async ({ url, cookies }) => {

        // Check if user consents to personalized cookies, if not return
        const consentCookie = cookies.get("consentCookie");
        if (!consentCookie) return;
        else if (!JSON.parse(consentCookie).personalized) return;

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