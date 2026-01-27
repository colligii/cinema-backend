import { Field, ObjectType } from "@nestjs/graphql";
import { Movie } from "src/catalog/movie/entity/movie.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Genres {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    @JoinTable({ name: 'movie_genres' })
    movies: Movie[];
}