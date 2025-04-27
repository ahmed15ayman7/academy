import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateGroupInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    adminId: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isPrivate: boolean;
} 