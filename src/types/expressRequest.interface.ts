import { UserEntity } from "@app/user/user.entity";
import { Request } from "express";

// necessary to type user on Request to be allowed to get user entity
export interface ExpressRequest extends Request {
    user?: UserEntity
}