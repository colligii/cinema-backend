import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IndicativeRating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 10 })
    code: string;
    
    @Column({ type: 'int' })
    minAge: number;
}