import { ApiProperty } from '@nestjs/swagger';
import { NotificationType, NotificationTarget } from './create-notification.dto';

export class NotificationResponseDto {
    @ApiProperty({ description: 'معرف الإشعار' })
    id: string;

    @ApiProperty({ description: 'عنوان الإشعار' })
    title: string;

    @ApiProperty({ description: 'محتوى الإشعار' })
    content: string;

    @ApiProperty({ enum: NotificationType, description: 'نوع الإشعار' })
    type: NotificationType;

    @ApiProperty({ enum: NotificationTarget, description: 'الفئة المستهدفة' })
    target: NotificationTarget;

    @ApiProperty({ description: 'معرف المستخدم المستهدف (اختياري)' })
    targetUserId?: string;

    @ApiProperty({ description: 'تاريخ إنشاء الإشعار' })
    createdAt: Date;

    @ApiProperty({ description: 'تاريخ آخر تحديث للإشعار' })
    updatedAt: Date;
} 