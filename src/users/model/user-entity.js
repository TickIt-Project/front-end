export class UserEntity {
    constructor(
        id = '',
        company = '',
        role = '',
        companyRole = '',
        profile_image = '',
        name = '',
        email = '',
        password = '',
        notifyActive = false
    ) {
        this.id = id;
        this.company = company;
        this.role = role;
        this.companyRole = companyRole;
        this.imgUrl = profile_image;
        this.name = name;
        this.email = email;
        this.password = password;
        this.notifyActive = notifyActive;
    }
}