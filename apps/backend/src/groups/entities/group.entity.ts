import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
export class Group {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => User)
    admin: User;

    @Field(() => [User])
    members: User[];

    @Field(() => [Post])
    posts: Post[];

    @Field()
    isPrivate: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 