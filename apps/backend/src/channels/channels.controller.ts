import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from '../../dtos/Channel.create.dto';
import { UpdateChannelDto } from '../../dtos/Channel.update.dto';
import { ChannelDto } from '../../dtos/Channel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('channels')
@UseGuards(JwtAuthGuard)
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) { }

    @Post()
    async create(@Body() createChannelDto: CreateChannelDto): Promise<ChannelDto> {
        return this.channelsService.create(createChannelDto);
    }

    @Get()
    async findAll(): Promise<ChannelDto[]> {
        return this.channelsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ChannelDto> {
        return this.channelsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto,
    ): Promise<ChannelDto> {
        return this.channelsService.update(id, updateChannelDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.channelsService.remove(id);
    }
} 