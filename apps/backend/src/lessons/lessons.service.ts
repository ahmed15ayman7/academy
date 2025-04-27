import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Injectable()
export class LessonsService {
    constructor(private prisma: PrismaService) { }

    async create(createLessonInput: CreateLessonInput) {
        return this.prisma.lesson.create({
            data: createLessonInput,
            include: {
                course: true,
                completedBy: true,
            },
        });
    }

    async findAll() {
        return this.prisma.lesson.findMany({
            include: {
                course: true,
                completedBy: true,
            },
        });
    }

    async findOne(id: string) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: {
                course: true,
                completedBy: true,
            },
        });

        if (!lesson) {
            throw new NotFoundException(`Lesson with ID ${id} not found`);
        }

        return lesson;
    }

    async update(id: string, updateLessonInput: UpdateLessonInput) {
        const lesson = await this.findOne(id);

        return this.prisma.lesson.update({
            where: { id },
            data: updateLessonInput,
            include: {
                course: true,
                completedBy: true,
            },
        });
    }

    async remove(id: string) {
        const lesson = await this.findOne(id);

        return this.prisma.lesson.delete({
            where: { id },
        });
    }

    async markLessonAsCompleted(lessonId: string, userId: string) {
        const lesson = await this.findOne(lessonId);

        return this.prisma.lesson.update({
            where: { id: lessonId },
            data: {
                completedBy: {
                    connect: { id: userId },
                },
            },
            include: {
                course: true,
                completedBy: true,
            },
        });
    }

    async markLessonAsIncomplete(lessonId: string, userId: string) {
        const lesson = await this.findOne(lessonId);

        return this.prisma.lesson.update({
            where: { id: lessonId },
            data: {
                completedBy: {
                    disconnect: { id: userId },
                },
            },
            include: {
                course: true,
                completedBy: true,
            },
        });
    }
} 