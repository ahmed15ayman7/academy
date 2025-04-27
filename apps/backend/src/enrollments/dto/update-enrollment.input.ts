import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateEnrollmentInput } from './create-enrollment.input';

@InputType()
export class UpdateEnrollmentInput extends PartialType(CreateEnrollmentInput) {
    @Field()
    id: string;
} 