import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateQuizInput } from './create-quiz.input';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
    @Field()
    id: string;
} 