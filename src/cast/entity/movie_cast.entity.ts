import { Movie } from "src/movie/entity/movie.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Cast } from "./cast.entity";

@Entity()
export class MovieCast {
    @PrimaryColumn()
    movie_id: string;

    @PrimaryColumn()
    cast_id: string;

    @ManyToOne(() => Movie, (movie) => movie.id)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;
    
    @ManyToOne(() => Cast, (cast) => cast.id)
    @JoinColumn({ name: 'cast_id' })
    cast: Cast;

    @Column({ type: 'enum', enum: ['director', 'actor'] })
    type: string;
}