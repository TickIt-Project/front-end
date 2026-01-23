import { http } from "@/shared/services/http-common.js";

export class UsersService {

    getEmployeesByCompanyId() {
        return http.get(`/employees`);
    }

    getITMembersByCompanyId() {
        return http.get(`/it-members`);
    }

    getUserById(id) {
        return http.get(`/users/${id}`);
    }

    getCurrentUser() {
        return http.get('/users/1');
    }

    updateUser(updateUser) {
        console.log("se va a updatear el usuario",updateUser);
        return http.patch('/users/1', updateUser);
    }

}