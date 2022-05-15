import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    // data transfer object : used to define body requests (schema payload)
    @IsNotEmpty()
    readonly username: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    readonly password: string;
}