import { Field, ObjectType } from "@nestjs/graphql";
import { ReservedSeats } from "src/reserved_seats/entity/reserved_seats.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Client {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Field()
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Field()
    @Column({ type: 'varchar', length: 50, unique: true })
    document: string

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field({ nullable: true })
    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => ReservedSeats, reservedSeats => reservedSeats.client)
    reservedSeats: ReservedSeats[]
}