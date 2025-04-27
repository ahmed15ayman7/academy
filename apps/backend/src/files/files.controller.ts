import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from '../../dtos/File.create.dto';
import { UpdateFileDto } from '../../dtos/File.update.dto';
import { FileDto } from '../../dtos/File.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post()
    async create(@Body() createFileDto: CreateFileDto): Promise<FileDto> {
        return this.filesService.create(createFileDto);
    }

    @Get()
    async findAll(): Promise<FileDto[]> {
        return this.filesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<FileDto> {
        return this.filesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFileDto: UpdateFileDto,
    ): Promise<FileDto> {
        return this.filesService.update(id, updateFileDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.filesService.remove(id);
    }
} 