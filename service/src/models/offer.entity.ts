import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: string;

    @Column({
        name: 'available'
    })
    available: number;

    @Column({
        name: 'game_id'
    })
    game_id: string;

    @Column({
        name: 'price'
    })
    price: string;

    @Column({
        name: 'currency'
    })
    currency: string;

    @Column({
        name: 'name'
    })
    name: string;

}