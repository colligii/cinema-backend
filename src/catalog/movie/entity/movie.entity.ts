import { MovieCast } from "src/catalog/cast/entity/movie_cast.entity";
import { Genres } from "src/catalog/genres/entity/genres.entity";
import { IndicativeRating } from "src/catalog/indicative_rating/entity/indicative_rating.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'uuid' })
    indicative_rating_id: string;

    @ManyToOne(() => IndicativeRating, (indicativeRating) => indicativeRating.id)
    @JoinColumn({ name: 'indicative_rating_id' })
    indicativeRating: IndicativeRating;

    @ManyToMany(() => Genres, (genres) => genres.movies)
    genres: Genres[];

    @OneToMany(() => MovieCast, (movieCast) => movieCast.movie)
    movieCast: MovieCast[];
}