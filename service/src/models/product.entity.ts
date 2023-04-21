import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: string;

    @Column({
        name: 'amount'
    })
    amount: number;

    @Column({
        name: 'name'
    })
    name: string;

    @Column({
        name: 'offer_id'
    })
    offer_id: string;

    @Column({
        name: 'sku'
    })
    sku: string;
}