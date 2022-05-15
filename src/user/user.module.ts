import { Module } from "@nestjs/common";
import { UserController } from "@app/user/user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], // we shall define the typeormmodule as .forFeature(xxx) for our module entity
    controllers: [UserController],
    providers: [UserService, AuthGuard], // guards have to be defined here
    exports: [UserService] // let the app module use UserService for our middleware case
})
export class UserModule {}