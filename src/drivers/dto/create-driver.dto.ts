export class CreateDriverDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profileImage?: string;
    licenseImage?: string;
    idCardImage?: string;
}