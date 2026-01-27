import { Module } from "@nestjs/common";
import { MovieModule } from "./movie/movie.module";
import { IndicativeRatingModule } from "./indicative_rating/indicative_rating.module";
import { GenresModule } from "./genres/genres.module";
import { CastModule } from "./cast/cast.module";

@Module({
  imports: [
    MovieModule,
    IndicativeRatingModule,
    GenresModule,
    CastModule,
  ]
})
export class CatalogModule {}
