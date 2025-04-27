import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Notification {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    message: string;

    @Field()
    type: string;

    @Field()
    isRead: boolean;

    @Field(() => User)
    user: User;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 