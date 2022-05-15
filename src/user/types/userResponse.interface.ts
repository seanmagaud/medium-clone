import { UserType } from "./user.type";

// interface is needed to type our user model
export interface UserResponseInterface {
    // & is used to merge two types, because token value is not a user column
    user: UserType & { token: string};
}