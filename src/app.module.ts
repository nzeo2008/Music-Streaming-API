import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresProperties } from './configs/database.config';

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getPostgresProperties,
		}),
	],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
