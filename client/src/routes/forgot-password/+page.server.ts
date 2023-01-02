import type {Actions, PageServerLoad} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {AuthApiError} from "@supabase/supabase-js";

export const load: PageServerLoad = async ({locals}) => {
    if (locals.session) throw redirect(303,"/home");
}

export const actions: Actions = {
    forgotPassword: async ({request, locals, url}) => {
        const body = Object.fromEntries(await request.formData());
        const {data, error: err} = await locals.sb.auth.resetPasswordForEmail(body.email as string);

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    message: 'Unknown emai.'
                });
            }
            return fail(500, {
                message: 'Server error, try again later'
            });
        }
        return {
            success: true,
            message : 'Successfully sent email to reset your password!'
        };
    }
}