import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementInput } from './dto/create-achievement.input';
import { UpdateAchievementInput } from './dto/update-achievement.input';

@Injectable()
export class AchievementsService {
    constructor(private prisma: PrismaService) { }

    async create(createAchievementInput: CreateAchievementInput) {
        return this.prisma.achievement.create({
            data: createAchievementInput,
        });
    }

    async findAll() {
        return this.prisma.achievement.findMany({
            include: {
                users: true,
            },
        });
    }

    async findOne(id: string) {
        const achievement = await this.prisma.achievement.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });

        if (!achievement) {
            throw new NotFoundException(`Achievement with ID ${id} not found`);
        }

        return achievement;
    }

    async update(id: string, updateAchievementInput: UpdateAchievementInput) {
        const achievement = await this.findOne(id);

        return this.prisma.achievement.update({
            where: { id },
            data: updateAchievementInput,
            include: {
                users: true,
            },
        });
    }

    async remove(id: string) {
        const achievement = await this.findOne(id);

        return this.prisma.achievement.delete({
            where: { id },
        });
    }

    async assignAchievementToUser(achievementId: string, userId: string) {
        const achievement = await this.findOne(achievementId);

        return this.prisma.achievement.update({
            where: { id: achievementId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
            include: {
                users: true,
            },
        });
    }

    async removeAchievementFromUser(achievementId: string, userId: string) {
        const achievement = await this.findOne(achievementId);

        return this.prisma.achievement.update({
            where: { id: achievementId },
            data: {
                users: {
                    disconnect: { id: userId },
                },
            },
            include: {
                users: true,
            },
        });
    }
} 