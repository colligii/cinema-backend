import { Field, ObjectType } from "@nestjs/graphql";
import { MovieCast } from "src/catalog/cast/entity/movie_cast.entity";
import { Genres } from "src/catalog/genres/entity/genres.entity";
import { IndicativeRating } from "src/catalog/indicative_rating/entity/indicative_rating.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Movie {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Field()
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    
    @Field()
    @Column({ type: 'text' })
    coverArt: string;
    
    @Field()
    @Column({ type: 'text' })
    description: string;
    
    @Field()
    @Column({ type: 'int' })
    duration: number;
    
    @Field()
    @Column({ type: 'boolean' })
    isReleased: boolean;
    
    @Field()
    @Column({ type: 'text' })
    trailerUrl: string;
    
    @Column({ type: 'uuid' })
    indicative_rating_id: string;
    
    @Field()
    @CreateDateColumn()
    created_at: Date;
    
    @Field({ nullable: true })
    @DeleteDateColumn()
    deleted_at?: Date;
    
    @Field(() => IndicativeRating)
    @ManyToOne(() => IndicativeRating, (indicativeRating) => indicativeRating.id)
    @JoinColumn({ name: 'indicative_rating_id' })
    indicativeRating: IndicativeRating;
    
    @Field(() => [Genres])
    @ManyToMany(() => Genres, (genres) => genres.movies)
    genres: Genres[];
    
    @Field(() => [MovieCast])
    @OneToMany(() => MovieCast, (movieCast) => movieCast.movie, { cascade: true })
    movieCast: MovieCast[];
}