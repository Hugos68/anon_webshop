import type {Cookies} from "@sveltejs/kit";

export const arePersonalizedCookiesAllowed = (cookies : Cookies) => {
    const consentCookie : string | undefined = cookies.get("cookieconsent");
    if (!consentCookie) return false;
    const consentCookieParsed : ConsentCookie = JSON.parse(consentCookie);
    return consentCookieParsed.personalized;
}