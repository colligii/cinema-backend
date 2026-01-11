import { Client } from "src/client/entity/client.entity";
import { MovieRoomSeats } from "src/movie_room/entity/movie_room_seats.entity";
import { MovieSession } from "src/movie_session/entity/movie_session.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservedSeats {
    @PrimaryColumn()
    movie_room_seat_id: string;

    @PrimaryColumn()
    movie_session_id: string;

    @ManyToOne(() => MovieRoomSeats, movieRoomSeats => movieRoomSeats.reservedSeats)
    @JoinColumn({ name: 'movie_room_seat_id' })
    movieRoomSeat: MovieRoomSeats

    @ManyToOne(() => MovieSession, movieSession => movieSession.id)
    @JoinColumn({ name: 'movie_session_id' })
    movieSession: MovieSession

    @ManyToOne(() => Client, client => client.id)
    @JoinColumn({ name: 'client_id' })
    client: Client;

}