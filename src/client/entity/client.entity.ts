import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 50 })
    document: string
}