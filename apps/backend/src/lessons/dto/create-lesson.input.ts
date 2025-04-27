import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class CreateLessonInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    order: number;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isPublished: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    courseId: string;
} 