import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../../dtos/Post.create.dto';
import { UpdatePostDto } from '../../dtos/Post.update.dto';
import { PostDto } from '../../dtos/Post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(): Promise<PostDto[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PostDto> {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostDto> {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.postsService.remove(id);
    }
} 