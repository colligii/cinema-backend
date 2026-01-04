import { Movie } from "src/movie/entity/movie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poster {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    url: string;

    @Column({ type: 'float' })
    width: number;

    @Column({ type: 'float' })
    height: number;

    @Column({ type: 'enum', enum: ['banner', 'square'] })
    type: string;

    @ManyToOne(() => Movie, (movie) => movie.id)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;
}