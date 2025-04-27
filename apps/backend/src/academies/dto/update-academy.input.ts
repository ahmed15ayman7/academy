import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAcademyInput } from './create-academy.input';

@InputType()
export class UpdateAcademyInput extends PartialType(CreateAcademyInput) {
    @Field()
    id: string;
} 