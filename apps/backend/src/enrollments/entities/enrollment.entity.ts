import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
export class Enrollment {
    @Field(() => ID)
    id: string;

    @Field(() => User)
    user: User;

    @Field()
    userId: string;

    @Field(() => Course)
    course: Course;

    @Field()
    courseId: string;

    @Field()
    status: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 