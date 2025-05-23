import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateMessageInput } from './create-message.input';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
    @Field()
    id: string;
} 