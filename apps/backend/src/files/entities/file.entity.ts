import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class File {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    url: string;

    @Field()
    type: string;

    @Field(() => User)
    user: User;

    @Field()
    userId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 