import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Question } from './question.entity';
import { QuizAttempt } from './quiz-attempt.entity';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
export class Quiz {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    duration: number;

    @Field()
    passingScore: number;

    @Field()
    maxAttempts: number;

    @Field()
    isPublished: boolean;

    @Field(() => Course)
    course: Course;

    @Field(() => [Question])
    questions: Question[];

    @Field(() => [QuizAttempt])
    attempts: QuizAttempt[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 