import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookmarkInput } from './create-bookmark.input';

@InputType()
export class UpdateBookmarkInput extends PartialType(CreateBookmarkInput) {
    @Field()
    id: string;
} 