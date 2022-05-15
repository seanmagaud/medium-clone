import { UserEntity } from "../user.entity";

// is necessary to create a UserType to remove hashPassword on our UserEntity
export type UserType = Omit<UserEntity, 'hashPassword'>;