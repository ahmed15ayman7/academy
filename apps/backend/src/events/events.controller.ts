import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from '../../dtos/Event.create.dto';
import { UpdateEventDto } from '../../dtos/Event.update.dto';
import { EventDto } from '../../dtos/Event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    async create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    async findAll(): Promise<EventDto[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EventDto> {
        return this.eventsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
    ): Promise<EventDto> {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.eventsService.remove(id);
    }
} 