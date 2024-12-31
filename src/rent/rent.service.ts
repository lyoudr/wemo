import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rent } from './rent.entity';
import { User } from '../user/user.entity';
import { Scooter } from '../scooter/scooter.entity';
import { ScooterStatus } from '../scooter/scooter.entity';

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

        // Mark the scooter as rented
        scooter.status = ScooterStatus.RENTED;
        await this.scooterRepository.save(scooter);

        return this.rentRepository.save(rent);
    }

    async returnScooter(rentId: number): Promise<Rent> {
        const rent = await this.rentRepository.findOne({
          where: {id: rentId},
          relations: ['scooter']
        });

        if (!rent || rent.endTime) {
            throw new BadRequestException('Invalid rent ID or scooter already returned');
        }
        rent.endTime = new Date();

        // Check if the scooter exists and is properly associated
        if (rent.scooter){
          const scooter = rent.scooter;
          scooter.status = ScooterStatus.AVAILABLE;
          await this.scooterRepository.save(scooter);
        } else {
          throw new BadRequestException('No associated scooter found for this rent');
        }
        return this.rentRepository.save(rent)
    }

    async getAvailableScooters(status: ScooterStatus.AVAILABLE | ScooterStatus.RENTED): Promise<Scooter[]> {
      let availableScooters;

      if (status === ScooterStatus.AVAILABLE) {
        // Fetch scooters that are available (either not rented or the rent has ended)
        availableScooters = await this.scooterRepository
          .createQueryBuilder('scooter')
          .andWhere('scooter.status = :status', { status: ScooterStatus.AVAILABLE })  // Filter by AVAILABLE status
          .orderBy('scooter.id', 'ASC')
          .getMany();
      } else if (status === ScooterStatus.RENTED) {
          // Fetch scooters that are currently rented
          availableScooters = await this.scooterRepository
            .createQueryBuilder('scooter')
            .andWhere('scooter.status = :status', { status: ScooterStatus.RENTED })  // Filter by RENTED status
            .orderBy('scooter.id', 'ASC')
            .getMany();
      } else {
          // If no status is provided, fetch all scooters
          availableScooters = await this.scooterRepository
            .createQueryBuilder('scooter')
            .orderBy('scooter.id', 'ASC') // Order by scooter ID
            .getMany();
      }
      return availableScooters;
    }

    async getAllRentedRecords() {
      const rentedScooters = await this.rentRepository
        .createQueryBuilder('rent')
        .leftJoinAndSelect('rent.scooter', 'scooter')
        .leftJoinAndSelect('rent.user', 'user')
        .select([
          'rent.id',
          'rent.startTime',
          'rent.endTime',
          'scooter.model',
          'user.name'
        ])
        .orderBy('rent.id', 'ASC')
        .getMany()
      const formattedScooters = rentedScooters.map(rent => ({
        id: rent.id,
        startTime: rent.startTime,
        endTime: rent.endTime,
        model: rent.scooter.model,
        name: rent.user.name, 
      }));
      return formattedScooters;
    }
}
