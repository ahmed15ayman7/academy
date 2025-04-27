import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Event {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field()
    location: string;

    @Field(() => User)
    user: User;

    @Field()
    userId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 