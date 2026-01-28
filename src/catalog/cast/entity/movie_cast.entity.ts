import { Movie } from "src/catalog/movie/entity/movie.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Cast } from "./cast.entity";
import { Field, ObjectType } from "@nestjs/graphql";

export enum MovieCastType {
    DIRECTOR = 'director',
    ACTOR = 'actor'
}

@ObjectType()
@Entity()
export class MovieCast {
    @Field()
    @PrimaryColumn()
    movie_id: string;

    @Field()
    @PrimaryColumn()
    cast_id: string;

    @ManyToOne(() => Movie, (movie) => movie.id)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @Field(() => Cast)
    @ManyToOne(() => Cast, (cast) => cast.id)
    @JoinColumn({ name: 'cast_id' })
    cast: Cast;

    @Field()
    @Column({ type: 'enum', enum: MovieCastType })
    type: MovieCastType;
}