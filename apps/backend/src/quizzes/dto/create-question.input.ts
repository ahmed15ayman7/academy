import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateQuestionInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    text: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    type: string;

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    points: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    quizId: string;
} 