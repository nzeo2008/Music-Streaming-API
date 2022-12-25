import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { ERROR_MESSAGE } from './constants/messages.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() dto: RegisterDTO) {
		const user = await this.authService.register(dto);
		if (!user)
			throw new HttpException(
				ERROR_MESSAGE.USER_ALREADY_EXIST,
				HttpStatus.CONFLICT,
			);
		return user;
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() dto: AuthDTO) {
		const res = await this.authService.login(dto);
		if (!res)
			throw new HttpException(
				ERROR_MESSAGE.WRONG_PASSWORD_OR_EMAIL,
				HttpStatus.UNAUTHORIZED,
			);
		return res;
	}
}
