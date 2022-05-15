import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  // data transfer object : used to define body requests (schema payload)

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
