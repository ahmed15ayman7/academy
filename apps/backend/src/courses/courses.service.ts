import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async create(createCourseInput: CreateCourseInput) {
        return this.prisma.course.create({
            data: {
                ...createCourseInput,
                instructor: {
                    connect: { id: createCourseInput.instructorId },
                },
            },
            include: {
                instructor: true,
                students: true,
                lessons: true,
                quizzes: true,
            },
        });
    }

    async findAll() {
        return this.prisma.course.findMany({
            include: {
                instructor: true,
                students: true,
                lessons: true,
                quizzes: true,
            },
        });
    }

    async findOne(id: string) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                instructor: true,
                students: true,
                lessons: true,
                quizzes: true,
            },
        });

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }

        return course;
    }

    async update(id: string, updateCourseInput: UpdateCourseInput) {
        await this.findOne(id);
        return this.prisma.course.update({
            where: { id },
            data: updateCourseInput,
            include: {
                instructor: true,
                students: true,
                lessons: true,
                quizzes: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.course.delete({
            where: { id },
        });
    }

    async enrollStudent(courseId: string, studentId: string) {
        await this.findOne(courseId);
        return this.prisma.course.update({
            where: { id: courseId },
            data: {
                students: {
                    connect: { id: studentId },
                },
            },
            include: {
                instructor: true,
                students: true,
                lessons: true,
                quizzes: true,
            },
        });
    }

    async getCourseLessons(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.lesson.findMany({
            where: { courseId },
            include: {
                course: true,
            },
        });
    }

    async getCourseQuizzes(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.quiz.findMany({
            where: { courseId },
            include: {
                course: true,
                questions: true,
            },
        });
    }

    async getCourseStudents(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.user.findMany({
            where: {
                enrolledCourses: {
                    some: { id: courseId },
                },
            },
        });
    }
} 