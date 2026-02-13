import { http } from "@/shared/services/http-common.js";

export class AuthService {

    signUp(formValues) {
        return http.post(`authentication/sign-up`, formValues);
    }

    signIn(formValues) {
        return http.post(`authentication/sign-in`,formValues);
    }

}