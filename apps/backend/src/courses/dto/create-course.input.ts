import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateCourseInput {
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
    @IsString()
    thumbnail: string;

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    level: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    status: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    instructorId: string;
} 