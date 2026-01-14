import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserHelper } from "../helper/user.helper";

@InputType()
export class CreateUser {
    @Field()
    @IsString({ 
        message: UserHelper.NameIsNotAString
    })
    @IsNotEmpty({
        message: UserHelper.NameIsNotEmpty
    })
    name: string;

    @Field()
    @IsString({ 
        message: UserHelper.LastNameIsNotAString
    })
    @IsNotEmpty({
        message: UserHelper.LastNameIsNotEmpty
    })
    last_name: string;

    @Field()
    @IsEmail(undefined, { 
        message: UserHelper.EmailIsNotAnEmail
    })
    @IsNotEmpty({
        message: UserHelper.EmailIsNotEmpty
    })
    email: string;

    @Field()
    @IsString({ 
        message: UserHelper.PasswordIsNotAString
    })
    @IsNotEmpty({
        message: UserHelper.PasswordIsNotEmpty
    })
    password: string;
}