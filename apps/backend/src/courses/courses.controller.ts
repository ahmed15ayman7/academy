import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from '../../dtos/Course.create.dto';
import { UpdateCourseDto } from '../../dtos/Course.update.dto';
import { CourseDto } from '../../dtos/Course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    async findAll(): Promise<CourseDto[]> {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CourseDto> {
        return this.coursesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<CourseDto> {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.coursesService.remove(id);
    }
} 