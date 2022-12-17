import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CredentialPetugas {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
    email: string;

  @IsNotEmpty()
  @MinLength(8)
    password: string;
}
