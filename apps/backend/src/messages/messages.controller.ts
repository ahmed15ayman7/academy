import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dtos/Message.create.dto';
import { UpdateMessageDto } from '../../dtos/Message.update.dto';
import { MessageDto } from '../../dtos/Message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto): Promise<MessageDto> {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    async findAll(): Promise<MessageDto[]> {
        return this.messagesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MessageDto> {
        return this.messagesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ): Promise<MessageDto> {
        return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.messagesService.remove(id);
    }
} 