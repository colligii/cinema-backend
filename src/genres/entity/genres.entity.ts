import { Movie } from "src/movie/entity/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genres {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    @JoinTable({ name: 'movie_genres' })
    movies: Movie[];
}