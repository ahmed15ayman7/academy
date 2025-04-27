import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateQuestionInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isAnswered: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    authorId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    lessonId: string;
} 