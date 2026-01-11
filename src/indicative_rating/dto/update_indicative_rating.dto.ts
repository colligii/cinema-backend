import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { IndicativeRatingHelper } from '../helper/indicative_rating.helper';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateIndicativeRating {
    @Field()
    @IsUUID(undefined, {
        message: IndicativeRatingHelper.IDIsUUID
    })
    @IsNotEmpty({ message: IndicativeRatingHelper.IDIsNotNull })
    id: string;
    
    @Field({ nullable: true })
    @IsOptional()
    @IsString({
        message: IndicativeRatingHelper.CodeIsString
    })
    @MaxLength(10, { message: IndicativeRatingHelper.CodeMaxLength })
    code?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber(undefined, { message: IndicativeRatingHelper.MinAgeIsNumber})
    minAge?: number;
}