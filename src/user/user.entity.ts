import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rent } from '../rent/rent.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(() => Rent, rent => rent.user)
    rents: Rent[];
}