import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEnrollmentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @Field({ nullable: true })
    @IsString()
    status?: string;
} 