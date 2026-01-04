import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovieRoom } from "./movie_room.entity";

@Entity()
export class MovieRoomSeats {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 4 })
    code: string;

    @ManyToOne(() => MovieRoom, movieRoom => movieRoom.id)
    @JoinColumn({ name: 'movie_room_id' })
    movieRoom: MovieRoom
}