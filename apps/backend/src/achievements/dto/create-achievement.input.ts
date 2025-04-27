import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateAchievementInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    icon: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    points: number;
} 