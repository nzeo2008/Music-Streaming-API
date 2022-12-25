import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
	@MaxLength(12)
	@MinLength(2)
	@IsString()
	readonly name: string;

	@IsEmail()
	@MinLength(2)
	@MaxLength(20)
	@IsString()
	readonly email: string;

	@MaxLength(20)
	@MinLength(8)
	@IsString()
	readonly password: string;
}
