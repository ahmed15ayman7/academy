import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { CreateAcademyDto } from '../../dtos/Academy.create.dto';
import { UpdateAcademyDto } from '../../dtos/Academy.update.dto';
import { AcademyDto } from '../../dtos/Academy.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('academies')
@UseGuards(JwtAuthGuard)
export class AcademiesController {
    constructor(private readonly academiesService: AcademiesService) { }

    @Post()
    async create(@Body() createAcademyDto: CreateAcademyDto): Promise<AcademyDto> {
        return this.academiesService.create(createAcademyDto);
    }

    @Get()
    async findAll(): Promise<AcademyDto[]> {
        return this.academiesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AcademyDto> {
        return this.academiesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAcademyDto: UpdateAcademyDto,
    ): Promise<AcademyDto> {
        return this.academiesService.update(id, updateAcademyDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.academiesService.remove(id);
    }
} 