import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { UpdateBookmarkInput } from './dto/update-bookmark.input';

@Injectable()
export class BookmarksService {
    constructor(private prisma: PrismaService) { }

    async create(createBookmarkInput: CreateBookmarkInput) {
        return this.prisma.bookmark.create({
            data: createBookmarkInput
        });
    }

    async findAll() {
        return this.prisma.bookmark.findMany();
    }

    async findOne(id: string) {
        return this.prisma.bookmark.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateBookmarkInput: UpdateBookmarkInput) {
        return this.prisma.bookmark.update({
            where: { id },
            data: updateBookmarkInput
        });
    }

    async remove(id: string) {
        return this.prisma.bookmark.delete({
            where: { id }
        });
    }
} 