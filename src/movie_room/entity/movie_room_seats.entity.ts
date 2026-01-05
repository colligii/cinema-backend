import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieRoom } from "./movie_room.entity";
import { ReservedSeats } from "src/reserved_seats/entity/reserved_seats.entity";

@Entity()
export class MovieRoomSeats {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 4 })
    code: string;

    @ManyToOne(() => MovieRoom, movieRoom => movieRoom.id)
    @JoinColumn({ name: 'movie_room_id' })
    movieRoom: MovieRoom

    @OneToMany(() => ReservedSeats, reservedSeats => reservedSeats.movie_room_seat_id)
    reservedSeats: ReservedSeats[];
}