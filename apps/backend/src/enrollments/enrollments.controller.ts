import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from '../../dtos/Enrollment.create.dto';
import { UpdateEnrollmentDto } from '../../dtos/Enrollment.update.dto';
import { EnrollmentDto } from '../../dtos/Enrollment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Post()
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto): Promise<EnrollmentDto> {
        return this.enrollmentsService.create(createEnrollmentDto);
    }

    @Get()
    async findAll(): Promise<EnrollmentDto[]> {
        return this.enrollmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EnrollmentDto> {
        return this.enrollmentsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEnrollmentDto: UpdateEnrollmentDto,
    ): Promise<EnrollmentDto> {
        return this.enrollmentsService.update(id, updateEnrollmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.enrollmentsService.remove(id);
    }
} 