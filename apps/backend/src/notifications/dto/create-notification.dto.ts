import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum NotificationType {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum NotificationTarget {
    ALL = 'all',
    STUDENTS = 'students',
    TEACHERS = 'teachers',
    PARENTS = 'parents',
    ADMINS = 'admins'
}

export class CreateNotificationDto {
    @ApiProperty({ description: 'عنوان الإشعار' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'محتوى الإشعار' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'نوع الإشعار', enum: NotificationType })
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty({ description: 'المستهدفون', enum: NotificationTarget })
    @IsEnum(NotificationTarget)
    target: NotificationTarget;

    @ApiProperty({ description: 'معرف المستخدم المستهدف', required: false })
    @IsString()
    @IsOptional()
    targetUserId?: string;
} 