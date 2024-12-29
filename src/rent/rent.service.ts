import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rent } from './rent.entity';
import { User } from '../user/user.entity';
import { Scooter } from '../scooter/scooter.entity';

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(Rent)
        private rentRepository: Repository<Rent>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Scooter)
        private scooterRepository: Repository<Scooter>,
    ) {}

    async rentScooter(userId: number, scooterId: number): Promise<Rent> {
        const user = await this.userRepository.findOne({where: {id: userId}});
        const scooter = await this.scooterRepository.findOne({where: {id: scooterId}});
    
        if (!user || !scooter) {
          throw new BadRequestException('Invalid user or scooter ID');
        }
    
        const existingRent = await this.rentRepository
          .createQueryBuilder('rent')
          .where('rent.userId = :userId', {userId})
          .andWhere('rent.endTime IS NULL')
          .getOne();
    
        if (existingRent) {
          throw new BadRequestException('User is already renting a scooter');
        }
    
        const scooterInUse = await this.rentRepository
          .createQueryBuilder('rent')
          .where('rent.scooterId = :scooterId', {scooterId})
          .andWhere('rent.endTime IS NULL')
          .getOne();
        
        
        if (scooterInUse) {
          throw new BadRequestException('Scooter is already in use');
        }
    
        const rent = new Rent();
        rent.user = user;
        rent.scooter = scooter;
        rent.startTime = new Date();
    
        return this.rentRepository.save(rent);
    }

    async returnScooter(rentId: number): Promise<Rent> {
        const rent = await this.rentRepository.findOne({where: {id: rentId}});

        if (!rent || rent.endTime) {
            throw new BadRequestException('Invalid rent ID or scooter already returned');
        }

        rent.endTime = new Date();
        return this.rentRepository.save(rent)
    }
}
