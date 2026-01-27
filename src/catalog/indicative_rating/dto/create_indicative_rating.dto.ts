import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { IndicativeRatingHelper } from '../helper/indicative_rating.helper';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIndicativeRating {
    @Field()
    @IsString({
        message: IndicativeRatingHelper.CodeIsString
    })
    @IsNotEmpty({
        message: IndicativeRatingHelper.CodeIsNotNull
    })
    @MaxLength(10, { message: IndicativeRatingHelper.CodeMaxLength })
    code: string;

    @Field()
    @IsNumber(undefined, { message: IndicativeRatingHelper.MinAgeIsNumber})
    @IsNotEmpty({ message: IndicativeRatingHelper.MinAgeIsNotNull })
    minAge: number;
}