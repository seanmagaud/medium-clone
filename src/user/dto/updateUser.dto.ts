import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  // data transfer object : used to define body requests (schema payload)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  readonly bio: string;

  readonly image: string;
}
