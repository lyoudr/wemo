import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { Rent } from './rent.entity';
import { User } from '../user/user.entity';
import { Scooter } from '../scooter/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, User, Scooter])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
