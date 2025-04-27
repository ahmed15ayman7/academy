import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,
    ) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const payment = this.paymentsRepository.create(createPaymentDto);
        return this.paymentsRepository.save(payment);
    }

    findAll(): Promise<Payment[]> {
        return this.paymentsRepository.find();
    }

    async findOne(id: string): Promise<Payment> {
        const payment = await this.paymentsRepository.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException('الدفعة غير موجودة');
        }
        return payment;
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        const payment = await this.findOne(id);
        Object.assign(payment, updatePaymentDto);
        return this.paymentsRepository.save(payment);
    }

    async remove(id: string): Promise<void> {
        const result = await this.paymentsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('الدفعة غير موجودة');
        }
    }
} 