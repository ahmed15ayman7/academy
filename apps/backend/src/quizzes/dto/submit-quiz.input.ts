import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class AnswerSubmission {
    @Field()
    @IsNotEmpty()
    @IsString()
    questionId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    answerId: string;
}

@InputType()
export class SubmitQuizInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    quizId: string;

    @Field(() => [AnswerSubmission])
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerSubmission)
    answers: AnswerSubmission[];
} 