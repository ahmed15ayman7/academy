import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Quiz } from './quiz.entity';
import { User } from '../../users/entities/user.entity';
import { QuestionResponse } from './question-response.entity';

@ObjectType()
export class QuizAttempt {
    @Field(() => ID)
    id: string;

    @Field(() => Quiz)
    quiz: Quiz;

    @Field(() => User)
    user: User;

    @Field()
    score: number;

    @Field()
    isPassed: boolean;

    @Field()
    timeSpent: number;

    @Field(() => [QuestionResponse])
    responses: QuestionResponse[];

    @Field()
    startedAt: Date;

    @Field()
    completedAt: Date;
} 