import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user_entity/user.entity';
import { AuthDTO } from './dto/auth.dto';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<AuthDTO>,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDTO) {
		const { password, email, ...updatedDto } = dto;
		const foundUser = await this.userRepository.findOneBy({ email });
		if (foundUser) return null;
		const hashedPassword = await this.generatePassword(password);
		const user = { ...updatedDto, email, password: hashedPassword };
		return this.userRepository.insert(user);
	}

	async login(dto: AuthDTO) {
		const { email } = dto;
		const foundUser = await this.userRepository.findOne({
			where: { email },
		});
		if (!foundUser) return null;
		const isValidPasword = await this.validateUser(
			dto.password,
			foundUser.password,
		);
		if (!isValidPasword) return null;
		return { access_token: await this.jwtService.signAsync({ foundUser }) };
	}

	private async generatePassword(password: string) {
		const salt = await bcrypt.genSalt(15);
		return bcrypt.hash(password, salt);
	}

	private async validateUser(password: string, hashedPassword: string) {
		return bcrypt.compare(password, hashedPassword);
	}
}
