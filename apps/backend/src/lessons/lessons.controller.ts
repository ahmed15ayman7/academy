import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from '../../dtos/Lesson.create.dto';
import { UpdateLessonDto } from '../../dtos/Lesson.update.dto';
import { LessonDto } from '../../dtos/Lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) { }

    @Post()
    async create(@Body() createLessonDto: CreateLessonDto): Promise<LessonDto> {
        return this.lessonsService.create(createLessonDto);
    }

    @Get()
    async findAll(): Promise<LessonDto[]> {
        return this.lessonsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<LessonDto> {
        return this.lessonsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateLessonDto: UpdateLessonDto,
    ): Promise<LessonDto> {
        return this.lessonsService.update(id, updateLessonDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.lessonsService.remove(id);
    }
} 