import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from '../../dtos/Group.create.dto';
import { UpdateGroupDto } from '../../dtos/Group.update.dto';
import { GroupDto } from '../../dtos/Group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
        return this.groupsService.create(createGroupDto);
    }

    @Get()
    async findAll(): Promise<GroupDto[]> {
        return this.groupsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<GroupDto> {
        return this.groupsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGroupDto: UpdateGroupDto,
    ): Promise<GroupDto> {
        return this.groupsService.update(id, updateGroupDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.groupsService.remove(id);
    }
} 