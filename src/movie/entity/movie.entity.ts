import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;
    
    @Column({ type: 'text' })
    coverArt: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'boolean' })
    isReleased: boolean;

    @Column({ type: 'text' })
    trailerUrl: string;
}