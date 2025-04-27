import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Answer } from '../../answers/entities/answer.entity';

@ObjectType()
export class Question {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    isAnswered: boolean;

    @Field(() => User)
    author: User;

    @Field(() => Lesson)
    lesson: Lesson;

    @Field(() => [Answer])
    answers: Answer[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 