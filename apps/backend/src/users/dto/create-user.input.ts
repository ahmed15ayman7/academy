import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '@shared/prisma';

@InputType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => UserRole, { defaultValue: UserRole.STUDENT })
    role: UserRole;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    bio?: string;

    @Field({ nullable: true })
    avatar?: string;
} 