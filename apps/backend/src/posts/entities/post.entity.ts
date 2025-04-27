import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
export class Post {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => User)
    author: User;

    @Field(() => [Comment])
    comments: Comment[];

    @Field()
    likesCount: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 