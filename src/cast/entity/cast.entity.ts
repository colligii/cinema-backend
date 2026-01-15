import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MovieCast } from "./movie_cast.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
@Unique(['name', 'last_name'])
export class Cast {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => MovieCast, (e) => e.cast)
    movieCast: MovieCast[];
}