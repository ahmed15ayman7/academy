import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Question } from './question.entity';

@ObjectType()
export class Answer {
    @Field(() => ID)
    id: string;

    @Field()
    text: string;

    @Field()
    isCorrect: boolean;

    @Field(() => Question)
    question: Question;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 