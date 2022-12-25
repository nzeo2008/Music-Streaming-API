import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Logger,
	Post,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { ERROR_MESSAGE } from './constants/messages.constants';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
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
		this.logger.log(`[register] Успешно создан пользователь ${dto.email}`);
		return user;
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() dto: AuthDTO) {
		const existedUser = await this.authService.login(dto);
		if (!existedUser)
			throw new HttpException(
				ERROR_MESSAGE.WRONG_PASSWORD_OR_EMAIL,
				HttpStatus.UNAUTHORIZED,
			);
		this.logger.log(
			`[login] Осуществлён вход в учётную запись ${dto.email}`,
		);
		return existedUser;
	}
}
