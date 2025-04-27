import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { UpdateSubmissionInput } from './dto/update-submission.input';

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) { }

    async create(createSubmissionInput: CreateSubmissionInput) {
        return this.prisma.submission.create({
            data: {
                ...createSubmissionInput,
                submittedAt: new Date(),
            },
            include: {
                student: true,
                assignment: true,
            },
        });
    }

    async findAll() {
        return this.prisma.submission.findMany({
            include: {
                student: true,
                assignment: true,
            },
        });
    }

    async findOne(id: string) {
        const submission = await this.prisma.submission.findUnique({
            where: { id },
            include: {
                student: true,
                assignment: true,
            },
        });

        if (!submission) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return submission;
    }

    async update(id: string, updateSubmissionInput: UpdateSubmissionInput) {
        const submission = await this.findOne(id);

        return this.prisma.submission.update({
            where: { id },
            data: {
                ...updateSubmissionInput,
                gradedAt: updateSubmissionInput.isGraded ? new Date() : null,
            },
            include: {
                student: true,
                assignment: true,
            },
        });
    }

    async remove(id: string) {
        const submission = await this.findOne(id);

        return this.prisma.submission.delete({
            where: { id },
        });
    }

    async gradeSubmission(id: string, grade: number, feedback: string) {
        const submission = await this.findOne(id);

        return this.prisma.submission.update({
            where: { id },
            data: {
                grade,
                feedback,
                isGraded: true,
                gradedAt: new Date(),
            },
            include: {
                student: true,
                assignment: true,
            },
        });
    }

    async getStudentSubmissions(studentId: string) {
        return this.prisma.submission.findMany({
            where: { studentId },
            include: {
                student: true,
                assignment: true,
            },
        });
    }

    async getAssignmentSubmissions(assignmentId: string) {
        return this.prisma.submission.findMany({
            where: { assignmentId },
            include: {
                student: true,
                assignment: true,
            },
        });
    }
} 