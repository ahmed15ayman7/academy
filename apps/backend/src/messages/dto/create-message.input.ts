import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateMessageInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    senderId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    receiverId: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isRead: boolean;
} 