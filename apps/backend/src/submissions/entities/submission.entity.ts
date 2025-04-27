import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@ObjectType()
export class Submission {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field()
    grade: number;

    @Field()
    feedback: string;

    @Field()
    isGraded: boolean;

    @Field(() => User)
    student: User;

    @Field(() => Assignment)
    assignment: Assignment;

    @Field()
    submittedAt: Date;

    @Field()
    gradedAt: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 