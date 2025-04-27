import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from '../../dtos/Profile.create.dto';
import { UpdateProfileDto } from '../../dtos/Profile.update.dto';
import { ProfileDto } from '../../dtos/Profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Post()
    async create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileDto> {
        return this.profilesService.create(createProfileDto);
    }

    @Get()
    async findAll(): Promise<ProfileDto[]> {
        return this.profilesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProfileDto> {
        return this.profilesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<ProfileDto> {
        return this.profilesService.update(id, updateProfileDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.profilesService.remove(id);
    }
} 