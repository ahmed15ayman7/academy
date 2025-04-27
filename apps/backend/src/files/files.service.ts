import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Injectable()
export class FilesService {
    constructor(private prisma: PrismaService) { }

    async create(createFileInput: CreateFileInput) {
        return this.prisma.file.create({
            data: createFileInput
        });
    }

    async findAll() {
        return this.prisma.file.findMany();
    }

    async findOne(id: string) {
        return this.prisma.file.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateFileInput: UpdateFileInput) {
        return this.prisma.file.update({
            where: { id },
            data: updateFileInput
        });
    }

    async remove(id: string) {
        return this.prisma.file.delete({
            where: { id }
        });
    }
} 