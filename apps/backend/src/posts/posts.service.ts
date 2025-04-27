import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async create(createPostInput: CreatePostInput) {
        return this.prisma.post.create({
            data: {
                ...createPostInput,
                likesCount: 0,
            },
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async findAll() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                comments: true,
            },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostInput: UpdatePostInput) {
        const post = await this.findOne(id);

        return this.prisma.post.update({
            where: { id },
            data: updatePostInput,
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async remove(id: string) {
        const post = await this.findOne(id);

        return this.prisma.post.delete({
            where: { id },
        });
    }

    async likePost(id: string) {
        const post = await this.findOne(id);

        return this.prisma.post.update({
            where: { id },
            data: {
                likesCount: post.likesCount + 1,
            },
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async unlikePost(id: string) {
        const post = await this.findOne(id);

        return this.prisma.post.update({
            where: { id },
            data: {
                likesCount: Math.max(0, post.likesCount - 1),
            },
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async getUserPosts(userId: string) {
        return this.prisma.post.findMany({
            where: { authorId: userId },
            include: {
                author: true,
                comments: true,
            },
        });
    }
} 