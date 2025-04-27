import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Answer } from './answer.entity';
import { Quiz } from './quiz.entity';

@ObjectType()
export class Question {
    @Field(() => ID)
    id: string;

    @Field()
    text: string;

    @Field()
    type: string;

    @Field()
    points: number;

    @Field(() => Quiz)
    quiz: Quiz;

    @Field(() => [Answer])
    answers: Answer[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 