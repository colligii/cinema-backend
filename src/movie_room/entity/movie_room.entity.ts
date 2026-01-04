import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 10 })
    code: string
}