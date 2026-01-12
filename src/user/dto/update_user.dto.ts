import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UserHelper } from "../helper/user.helper";

@InputType()
export class UpdateUser {
    @Field()
    @IsUUID(undefined, {
        message: UserHelper.IDIsUUID
    })
    @IsNotEmpty({
        message: UserHelper.IDIsNotEmpty
    })
    id: string;

    @Field({ nullable: true })
    @IsString({ 
        message: UserHelper.NameIsNotAString
    })
    name?: string;

    @Field({ nullable: true })
    @IsString({ 
        message: UserHelper.LastNameIsNotAString
    })
    last_name?: string;

    @Field({ nullable: true })
    @IsString({ 
        message: UserHelper.PasswordIsNotAString
    })
    password?: string;
}