import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsEnum, IsOptional } from 'class-validator';

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded'
}

export class CreatePaymentDto {
    @ApiProperty({ description: 'معرف الطالب' })
    @IsString()
    studentId: string;

    @ApiProperty({ description: 'المبلغ' })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'تاريخ الدفع' })
    @IsDate()
    paymentDate: Date;

    @ApiProperty({ description: 'حالة الدفع', enum: PaymentStatus })
    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @ApiProperty({ description: 'ملاحظات', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 