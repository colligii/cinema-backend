import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieRoomSeats } from "./movie_room_seats.entity";

@Entity()
export class MovieRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 10 })
    code: string

    @OneToMany(() => MovieRoomSeats, movieRoomSeats => movieRoomSeats.id)
    movieRoomSeats: MovieRoomSeats[]
}