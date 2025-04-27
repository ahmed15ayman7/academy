import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsBoolean } from 'class-validator';
import { QuestionType } from '@prisma/client';

@InputType()
export class CreateAnswerInput {
    @Field()
    text: string;

    @Field()
    isCorrect: boolean;
}

@InputType()
export class CreateQuestionInput {
    @Field()
    text: string;

    @Field(() => QuestionType)
    type: QuestionType;

    @Field(() => Int)
    points: number;

    @Field(() => [CreateAnswerInput])
    answers: CreateAnswerInput[];
}

@InputType()
export class CreateQuizInput {
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
    courseId: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    timeLimit: number;

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    passingScore: number;

    @Field(() => [CreateQuestionInput])
    @IsNotEmpty()
    questions: CreateQuestionInput[];
} 