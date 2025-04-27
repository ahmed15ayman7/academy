import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from '../../dtos/Bookmark.create.dto';
import { UpdateBookmarkDto } from '../../dtos/Bookmark.update.dto';
import { BookmarkDto } from '../../dtos/Bookmark.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Post()
    async create(@Body() createBookmarkDto: CreateBookmarkDto): Promise<BookmarkDto> {
        return this.bookmarksService.create(createBookmarkDto);
    }

    @Get()
    async findAll(): Promise<BookmarkDto[]> {
        return this.bookmarksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BookmarkDto> {
        return this.bookmarksService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBookmarkDto: UpdateBookmarkDto,
    ): Promise<BookmarkDto> {
        return this.bookmarksService.update(id, updateBookmarkDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.bookmarksService.remove(id);
    }
} 