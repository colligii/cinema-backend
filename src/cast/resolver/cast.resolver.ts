import { Query, Resolver } from '@nestjs/graphql';
import { Cast } from '../entity/cast.entity';
import { randomUUID } from 'crypto';
import { MovieCast } from '../entity/movie_cast.entity';

@Resolver()
export class CastResolver {
    @Query(() => String)
    hello(): string {
        return 'Hello GraphQL';
    }

    @Query(() => Cast)
    getCast(): Cast {
        return {
            id: randomUUID(),
            name: 'oiii'
        } as unknown as Cast
    }

    @Query(() => MovieCast)
    getmovieCAst(): MovieCast {
        return {
            movie_id: randomUUID(),
            cast: this.getCast()
        } as unknown as MovieCast
    }
}
