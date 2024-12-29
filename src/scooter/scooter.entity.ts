import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rent } from '../rent/rent.entity';

@Entity()
export class Scooter {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    model: string;

    @OneToMany(() =>  Rent, rent => rent.scooter)
    rents: Rent[];
}