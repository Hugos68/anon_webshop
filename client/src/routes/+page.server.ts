import type {Actions} from './$types';

export const actions: Actions = {
    setTheme: async ({ url, cookies }) => {
        console.log("WORKED DONT TOUCH IT")
        const theme = url.searchParams.get("theme");
        if (theme) {
            cookies.set("colortheme", theme, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 10,
            });
        }
    },
    setCookieConsent: async ({url, cookies}) => {
        console.log("WORKED DONT TOUCH IT")
        const cookieConsent = url.searchParams.get("cookies");
        if (cookieConsent) {
            cookies.set("cookieconsent", cookieConsent, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 10,
            });
        }
    }
};