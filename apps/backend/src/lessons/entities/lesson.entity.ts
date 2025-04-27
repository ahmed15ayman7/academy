import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Lesson {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    content: string;

    @Field()
    duration: number;

    @Field()
    order: number;

    @Field()
    isPublished: boolean;

    @Field(() => Course)
    course: Course;

    @Field(() => [User])
    completedBy: User[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 