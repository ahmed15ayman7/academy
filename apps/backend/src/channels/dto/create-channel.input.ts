import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateChannelInput {
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
    ownerId: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isPrivate: boolean;
} 