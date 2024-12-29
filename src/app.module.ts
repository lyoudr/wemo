import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './seeder/seeder.service';
import { UserModule } from './user/user.module';
import { ScooterModule } from './scooter/scooter.module';
import { RentModule } from './rent/rent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { Scooter } from './scooter/scooter.entity';
import { Rent } from './rent/rent.entity';

@Module({
  imports: [
    UserModule, 
    ScooterModule, 
    RentModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      entities: [User, Scooter, Rent],
      autoLoadEntities: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
