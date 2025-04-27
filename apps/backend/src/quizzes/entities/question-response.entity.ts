import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizAttempt } from './quiz-attempt.entity';

@ObjectType()
export class QuestionResponse {
    @Field(() => ID)
    id: string;

    @Field(() => Question)
    question: Question;

    @Field(() => [Answer])
    selectedAnswers: Answer[];

    @Field()
    isCorrect: boolean;

    @Field()
    pointsEarned: number;

    @Field(() => QuizAttempt)
    attempt: QuizAttempt;

    @Field()
    createdAt: Date;
} 