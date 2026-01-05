import { ReservedSeats } from "src/reserved_seats/entity/reserved_seats.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'varchar', length: 50, unique: true })
    document: string

    @OneToMany(() => ReservedSeats, reservedSeats => reservedSeats.client)
    reservedSeats: ReservedSeats[]
}