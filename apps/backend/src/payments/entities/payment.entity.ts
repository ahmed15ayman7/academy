import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { PaymentStatus } from '../dto/create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'معرف الدفعة' })
    id: string;

    @ManyToOne(() => User)
    @ApiProperty({ description: 'الطالب' })
    student: User;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({ description: 'المبلغ' })
    amount: number;

    @Column()
    @ApiProperty({ description: 'تاريخ الدفع' })
    paymentDate: Date;

    @Column({ type: 'enum', enum: PaymentStatus })
    @ApiProperty({ description: 'حالة الدفع', enum: PaymentStatus })
    status: PaymentStatus;

    @Column({ nullable: true })
    @ApiProperty({ description: 'ملاحظات' })
    notes?: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'تاريخ الإنشاء' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'تاريخ آخر تحديث' })
    updatedAt: Date;
} 