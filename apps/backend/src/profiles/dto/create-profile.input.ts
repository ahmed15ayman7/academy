import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateProfileInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    bio?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    avatar?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    location?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    website?: string;
} 