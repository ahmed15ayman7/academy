import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    async create(createMessageInput: CreateMessageInput) {
        return this.prisma.message.create({
            data: createMessageInput,
            include: {
                sender: true,
                receiver: true,
            },
        });
    }

    async findAll() {
        return this.prisma.message.findMany({
            include: {
                sender: true,
                receiver: true,
            },
        });
    }

    async findOne(id: string) {
        const message = await this.prisma.message.findUnique({
            where: { id },
            include: {
                sender: true,
                receiver: true,
            },
        });

        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found`);
        }

        return message;
    }

    async update(id: string, updateMessageInput: UpdateMessageInput) {
        const message = await this.findOne(id);

        return this.prisma.message.update({
            where: { id },
            data: updateMessageInput,
            include: {
                sender: true,
                receiver: true,
            },
        });
    }

    async remove(id: string) {
        const message = await this.findOne(id);

        return this.prisma.message.delete({
            where: { id },
        });
    }

    async markAsRead(id: string) {
        const message = await this.findOne(id);

        return this.prisma.message.update({
            where: { id },
            data: {
                isRead: true,
            },
            include: {
                sender: true,
                receiver: true,
            },
        });
    }

    async getUserMessages(userId: string) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
            include: {
                sender: true,
                receiver: true,
            },
        });
    }

    async getConversation(userId1: string, userId2: string) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId1,
                        receiverId: userId2,
                    },
                    {
                        senderId: userId2,
                        receiverId: userId1,
                    },
                ],
            },
            include: {
                sender: true,
                receiver: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
} 