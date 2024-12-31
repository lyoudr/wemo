import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Scooter } from '../scooter/scooter.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
  ) {}

  async seed() {
    // Seed Users
    for (let i = 0; i < 3; i++) {
      const user = this.userRepository.create({
        name: faker.person.fullName(),
      });
      await this.userRepository.save(user);
    }

    // Seed Scooters
    for (let i = 0; i < 3; i++) {
      const scooter = this.scooterRepository.create({
        model: faker.vehicle.model(),
      });
      await this.scooterRepository.save(scooter);
    }
  }
}