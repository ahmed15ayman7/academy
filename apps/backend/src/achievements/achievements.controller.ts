import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from '../../dtos/Achievement.create.dto';
import { UpdateAchievementDto } from '../../dtos/Achievement.update.dto';
import { AchievementDto } from '../../dtos/Achievement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('achievements')
@UseGuards(JwtAuthGuard)
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) { }

    @Post()
    async create(@Body() createAchievementDto: CreateAchievementDto): Promise<AchievementDto> {
        return this.achievementsService.create(createAchievementDto);
    }

    @Get()
    async findAll(): Promise<AchievementDto[]> {
        return this.achievementsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AchievementDto> {
        return this.achievementsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAchievementDto: UpdateAchievementDto,
    ): Promise<AchievementDto> {
        return this.achievementsService.update(id, updateAchievementDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.achievementsService.remove(id);
    }
} 