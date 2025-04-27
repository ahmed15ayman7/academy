import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

@InputType()
export class CreateEventInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @Field()
    @IsNotEmpty()
    @IsDate()
    endDate: Date;

    @Field()
    @IsNotEmpty()
    @IsString()
    location: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    userId: string;
} 