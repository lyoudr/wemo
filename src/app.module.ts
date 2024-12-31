import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './seeder/seeder.service';
import { UserModule } from './user/user.module';
import { ScooterModule } from './scooter/scooter.module';
import { RentModule } from './rent/rent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './user/user.entity';
import { Scooter } from './scooter/scooter.entity';
import { Rent } from './rent/rent.entity';

@Module({
  imports: [
    UserModule, 
    ScooterModule, 
    RentModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Scooter, Rent],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
