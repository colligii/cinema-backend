import { Movie } from "src/movie/entity/movie.entity";
import { MovieRoom } from "src/movie_room/entity/movie_room.entity";
import { ReservedSeats } from "src/reserved_seats/entity/reserved_seats.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ['dub', 'leg'] })
    type: string;

    @Column({ type: 'timestamp' })
    startDateTime: Date;

    @Column({ type: 'timestamp' })
    endDateTime: Date;

    @Column({ type: 'uuid' })
    movie_id: string;

    @Column({ type: 'uuid' })
    movie_room_id: string;

    @ManyToOne(() => Movie, movie => movie.id)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie

    @ManyToOne(() => MovieRoom, movieRoom => movieRoom.id)
    @JoinColumn({ name: 'movie_room_id' })
    movieRoom: MovieRoom;

    @OneToMany(() => ReservedSeats, reservedSeats => reservedSeats.movie_session_id)
    movieSession: MovieSession;
}