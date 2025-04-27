import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademyInput } from './dto/create-academy.input';
import { UpdateAcademyInput } from './dto/update-academy.input';

@Injectable()
export class AcademiesService {
    constructor(private prisma: PrismaService) { }

    async create(createAcademyInput: CreateAcademyInput) {
        return this.prisma.academy.create({
            data: createAcademyInput,
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });
    }

    async findAll() {
        return this.prisma.academy.findMany({
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });
    }

    async findOne(id: string) {
        const academy = await this.prisma.academy.findUnique({
            where: { id },
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });

        if (!academy) {
            throw new NotFoundException(`Academy with ID ${id} not found`);
        }

        return academy;
    }

    async update(id: string, updateAcademyInput: UpdateAcademyInput) {
        const academy = await this.findOne(id);

        return this.prisma.academy.update({
            where: { id },
            data: updateAcademyInput,
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });
    }

    async remove(id: string) {
        const academy = await this.findOne(id);

        return this.prisma.academy.delete({
            where: { id },
        });
    }

    async addInstructor(academyId: string, instructorId: string) {
        const academy = await this.findOne(academyId);

        return this.prisma.academy.update({
            where: { id: academyId },
            data: {
                instructors: {
                    connect: { id: instructorId },
                },
            },
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });
    }

    async removeInstructor(academyId: string, instructorId: string) {
        const academy = await this.findOne(academyId);

        return this.prisma.academy.update({
            where: { id: academyId },
            data: {
                instructors: {
                    disconnect: { id: instructorId },
                },
            },
            include: {
                owner: true,
                instructors: true,
                courses: true,
            },
        });
    }
} 