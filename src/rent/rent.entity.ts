import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Scooter } from '../scooter/scooter.entity';

@Entity()
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @ManyToOne(() => User, user => user.rents)
    user: User;

    @ManyToOne(() => Scooter, scooter => scooter.rents)
    scooter: Scooter;
}