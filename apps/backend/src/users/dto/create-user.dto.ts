import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent'
}

export class CreateUserDto {
    @ApiProperty({ description: 'البريد الإلكتروني' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'كلمة المرور' })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ description: 'الاسم الأول' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'الاسم الأخير' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'دور المستخدم', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'معرف الأكاديمية', required: false })
    @IsString()
    @IsOptional()
    academyId?: string;
} 