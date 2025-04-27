import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBookmarkInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    url: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    userId: string;
} 