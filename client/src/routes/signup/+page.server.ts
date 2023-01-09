import type {Actions} from "./$types";
import {AuthApiError} from "@supabase/supabase-js";
import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    if (locals.session) throw redirect(302, "/home");
}

export const actions: Actions = {
    signup: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData());

        if (body.password!==body.confirmPassword) {
            return fail(400, {
                message: 'Password mismatch'
            });
        }
        if (
            !body.email ||
            !body.password
        ) {
            return fail(400, {
                message: 'Please fill in all fields'
            });
        }

        const {data, error: err} = await locals.sb.auth.signUp({
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

        // TODO: When User is already registered give error message

        throw redirect(303, '/login');
    }
}