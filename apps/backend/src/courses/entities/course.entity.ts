import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';

@ObjectType()
export class Course {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    thumbnail: string;

    @Field()
    price: number;

    @Field()
    level: string;

    @Field()
    duration: number;

    @Field()
    status: string;

    @Field(() => User)
    instructor: User;

    @Field(() => [User])
    students: User[];

    @Field(() => [Lesson])
    lessons: Lesson[];

    @Field(() => [Quiz])
    quizzes: Quiz[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 