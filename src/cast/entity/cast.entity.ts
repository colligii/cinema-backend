import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieCast } from "./movie_cast.entity";

@Entity()
export class Cast {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => MovieCast, (e) => e.cast)
    movieCast: MovieCast[];
}