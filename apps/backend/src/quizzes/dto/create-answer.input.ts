import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateAnswerInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    text: string;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isCorrect: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    questionId: string;
} 