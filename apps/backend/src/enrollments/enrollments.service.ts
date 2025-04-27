import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { UpdateEnrollmentInput } from './dto/update-enrollment.input';

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    async create(createEnrollmentInput: CreateEnrollmentInput) {
        return this.prisma.enrollment.create({
            data: createEnrollmentInput
        });
    }

    async findAll() {
        return this.prisma.enrollment.findMany();
    }

    async findOne(id: string) {
        return this.prisma.enrollment.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateEnrollmentInput: UpdateEnrollmentInput) {
        return this.prisma.enrollment.update({
            where: { id },
            data: updateEnrollmentInput
        });
    }

    async remove(id: string) {
        return this.prisma.enrollment.delete({
            where: { id }
        });
    }
} 