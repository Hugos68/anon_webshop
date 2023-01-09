import type {Actions} from "./$types";
import {AuthApiError, type Provider} from "@supabase/supabase-js";
import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    if (locals.session) throw redirect(302, "/home");
}

export const actions: Actions = {
    login: async ({request, locals, url, cookies}) => {

        // Check if user consents to required cookies, if not return
        const consentCookie = cookies.get("cookieconsent");
        if (!consentCookie) return;
        else if (!JSON.parse(consentCookie).required) return;

        const body = Object.fromEntries(await request.formData());

        const provider = url.searchParams.get("provider") as Provider;

        if (provider) {
            const {data, error: err } = await locals.sb.auth.signInWithOAuth({
                provider: provider
            });
            if (err) {
                return fail(400, {
                    message: 'Something went wrong'
                });
            }
            throw redirect(303, data.url);
        }
        else if (
            !body.email ||
            !body.password
        ) {
            return fail(400, {
                message: 'Please fill in all fields'
            });
        }
        const {data, error: err} = await locals.sb.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        });

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    message: err.message
                });
            }
            return fail(500, {
                message: err.message
            });
        }
        throw redirect(303, '/home');
    }
}