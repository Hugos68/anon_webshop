import { page } from "$app/stores";

export const arePersonalizedCookiesAllowed = () => {
    let consentCookie;
    page.subscribe(value => {
        consentCookie = value.data.consentCookie;
    });

    if (!consentCookie) return false;
    return consentCookie.personalized;
}

export const areFunctionalCookiesAllowed = () => {
    if (!consentCookie) return false;
    return consentCookie.functional;
}