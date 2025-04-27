import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Profile {
    @Field(() => ID)
    id: string;

    @Field(() => User)
    user: User;

    @Field()
    userId: string;

    @Field({ nullable: true })
    bio?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    location?: string;

    @Field({ nullable: true })
    website?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 