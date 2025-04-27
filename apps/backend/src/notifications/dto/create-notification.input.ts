import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateNotificationInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    message: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    type: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsOptional()
    @IsBoolean()
    isRead?: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    userId: string;
} 