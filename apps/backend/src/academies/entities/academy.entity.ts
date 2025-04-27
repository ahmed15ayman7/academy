import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
export class Academy {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    logo: string;

    @Field()
    website: string;

    @Field()
    isVerified: boolean;

    @Field(() => User)
    owner: User;

    @Field(() => [User])
    instructors: User[];

    @Field(() => [Course])
    courses: Course[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 