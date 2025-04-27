import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

@ObjectType()
export class Channel {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => User)
    owner: User;

    @Field(() => [User])
    members: User[];

    @Field(() => [Message])
    messages: Message[];

    @Field()
    isPrivate: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 