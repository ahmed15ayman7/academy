import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateAcademyInput {
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
    logo: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    website: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    ownerId: string;
} 