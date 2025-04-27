import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateSubmissionInput } from './create-submission.input';

@InputType()
export class UpdateSubmissionInput extends PartialType(CreateSubmissionInput) {
    @Field()
    id: string;
} 