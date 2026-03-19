import { http } from "@/shared/services/http-common.js";

export class UsersService {

    getUserByUserId(userId) {
        return http.get(`users/${userId}`);
    }

    getITMembersByCompanyId() {
        return http.get(`/it-members`);
    }

    getUserById(id) {
        return http.get(`/users/${id}`);
    }

    getCurrentUser() {
        return http.get(`/users/${localStorage.getItem('user_id')}`);
    }

    updateUser(updateUser) {
        console.log("se va a updatear el usuario",updateUser);
        return http.patch('/users/1', updateUser);
    }

    getEmployeesByCompanyId(CompanyId) {
        return http.get(`/users/${CompanyId}/roles?role=EMPLOYEE`);
    }

    updateProfileImage(userId, file) {
        const formData = new FormData();
        formData.append("image", file);

        return http.patch(`/users/${userId}/profile-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    updatePassword({ userId, oldPassword, newPassword }) {
        const companyId = localStorage.getItem('company_id');

        return http.patch(`/users/${companyId}/password`, {
            userId,
            oldPassword,
            newPassword
        });
    }


}