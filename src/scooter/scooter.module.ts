import { Module } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  exports: [TypeOrmModule],
  providers: [ScooterService]
})
export class ScooterModule {}
