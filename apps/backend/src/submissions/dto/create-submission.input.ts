import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateSubmissionInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    grade?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    feedback?: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isGraded: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    assignmentId: string;
} 