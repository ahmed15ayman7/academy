import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Achievement {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    icon: string;

    @Field()
    points: number;

    @Field(() => [User])
    users: User[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 