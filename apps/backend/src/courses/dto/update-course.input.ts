import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import { CreateCourseInput } from './create-course.input';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
    @Field(() => Float, { nullable: true })
    price?: number;

    @Field({ nullable: true })
    status?: string;
} 