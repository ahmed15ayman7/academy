import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Message {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field(() => User)
    sender: User;

    @Field(() => User)
    receiver: User;

    @Field()
    isRead: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 