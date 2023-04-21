import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: string;

    @Column({
        name: 'order_id',
    })
    order_id: string

    @Column({
        name: 'offer_id'
    })
    offer_id: string;

    @Column({
        name: 'user_id'
    })
    user_id: string;

    @Column({
        name: 'amount'
    })
    amount: number;

    @Column({
        name: 'currency'
    })
    currency: string;

}