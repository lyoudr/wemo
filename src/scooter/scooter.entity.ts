import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rent } from '../rent/rent.entity';

export enum ScooterStatus {
    AVAILABLE = 'AVAILABLE',
    RENTED = 'RENTED',
    ALL = 'ALL'
}

@Entity()
export class Scooter {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    model: string;

    @OneToMany(() =>  Rent, rent => rent.scooter)
    rents: Rent[];

    @Column({
        type: 'enum',
        enum: ScooterStatus,
        default: ScooterStatus.AVAILABLE, // Default value is 'AVAILABLE'
    })
    status: ScooterStatus;
}