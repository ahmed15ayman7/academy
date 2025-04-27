import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) { }

    async create(createQuestionInput: CreateQuestionInput) {
        return this.prisma.question.create({
            data: createQuestionInput,
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });
    }

    async findAll() {
        return this.prisma.question.findMany({
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });
    }

    async findOne(id: string) {
        const question = await this.prisma.question.findUnique({
            where: { id },
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });

        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return question;
    }

    async update(id: string, updateQuestionInput: UpdateQuestionInput) {
        const question = await this.findOne(id);

        return this.prisma.question.update({
            where: { id },
            data: updateQuestionInput,
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });
    }

    async remove(id: string) {
        const question = await this.findOne(id);

        return this.prisma.question.delete({
            where: { id },
        });
    }

    async markAsAnswered(id: string) {
        const question = await this.findOne(id);

        return this.prisma.question.update({
            where: { id },
            data: {
                isAnswered: true,
            },
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });
    }

    async markAsUnanswered(id: string) {
        const question = await this.findOne(id);

        return this.prisma.question.update({
            where: { id },
            data: {
                isAnswered: false,
            },
            include: {
                author: true,
                lesson: true,
                answers: true,
            },
        });
    }
} 