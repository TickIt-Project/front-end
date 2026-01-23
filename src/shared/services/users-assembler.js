import {UserEntity} from "@/users/model/user-entity.js";


export class UsersAssembler {
    EntityFromResponse(response) {
        return new UserEntity(
            response.id,
            response.company,
            response.role,
            response.company_role_id,
            response.profile_image,
            response.name,
            response.email,
            response.password,
            response.notify_active
        );
    }


    EntitiesFromResponse(responseArray) {
        if (!Array.isArray(responseArray)) return [];
        return responseArray.map(item => this.EntityFromResponse(item)); }

}