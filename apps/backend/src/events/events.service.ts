import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(createEventInput: CreateEventInput) {
        return this.prisma.event.create({
            data: createEventInput
        });
    }

    async findAll() {
        return this.prisma.event.findMany();
    }

    async findOne(id: string) {
        return this.prisma.event.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateEventInput: UpdateEventInput) {
        return this.prisma.event.update({
            where: { id },
            data: updateEventInput
        });
    }

    async remove(id: string) {
        return this.prisma.event.delete({
            where: { id }
        });
    }
} 