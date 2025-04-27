import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    role: string;
}

@ObjectType()
export class AuthResponse {
    @Field()
    access_token: string;

    @Field(() => UserResponse)
    user: UserResponse;
} 