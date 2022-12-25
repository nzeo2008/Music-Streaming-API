import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getPostgresProperties = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		host: configService.get('POSTGRES_HOST'),
		port: +configService.get('POSTGRES_PORT'),
		username: configService.get('POSTGRES_USERNAME'),
		password: configService.get('POSTGRES_PASSWORD'),
		database: 'postgres',
		autoLoadEntities: true,
		synchronize: true, // Убрать из production
	};
};
