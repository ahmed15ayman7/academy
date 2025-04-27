import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Bookmark {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    url: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => User)
    user: User;

    @Field()
    userId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 