import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from './../user_entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			secretOrKey: configService.get('JWT_SECRET'),
			ignoreExpiration: true,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}
	async validate({ isAdmin }: Pick<UserEntity, 'isAdmin'>) {
		return isAdmin;
	}
}
