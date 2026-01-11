import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieCast } from "./movie_cast.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Cast {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => MovieCast, (e) => e.cast)
    movieCast: MovieCast[];
}