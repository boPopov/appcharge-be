import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: string;

    @Column({
        name: 'name'
    })
    name: string;

    @Column({
        name: 'description'
    })
    description: string;
}