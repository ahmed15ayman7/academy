import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@shared/prisma';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
        academyId?: string;
    }) {
        return this.prisma.user.create({
            data,
            include: {
                profile: true,
                academy: true,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                profile: true,
                academy: true,
            },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                academy: true,
                enrollments: {
                    include: {
                        course: true,
                    },
                },
                achievements: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
                academy: true,
            },
        });
    }

    async update(id: string, data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        role?: UserRole;
        subRole?: string;
        avatar?: string;
        academyId?: string;
    }) {
        const user = await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data,
            include: {
                profile: true,
                academy: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async updateProfile(userId: string, data: {
        bio?: string;
        phone?: string;
        address?: string;
        preferences?: any;
    }) {
        return this.prisma.profile.upsert({
            where: { userId },
            update: data,
            create: {
                ...data,
                userId,
            },
        });
    }

    async getEnrollments(userId: string) {
        return this.prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: true,
            },
        });
    }

    async getAchievements(userId: string) {
        return this.prisma.achievement.findMany({
            where: { userId },
        });
    }
} 