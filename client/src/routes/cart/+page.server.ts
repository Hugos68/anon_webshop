import type {Actions} from "./$types";
import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.session) throw redirect(302, "/login");
}

export const actions: Actions = {
    checkout: async ({request, locals, url}) => {

    }
}