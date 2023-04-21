import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn({
        name: 'userid',
    })
    id: string;

    @Column({
        name: 'username'
    })
    username: string;

    @Column({
        name: 'password'
    })
    password: string;

    @Column({
        name: 'email'
    })
    email: string;
}