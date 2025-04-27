import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [BookmarksService, BookmarksResolver, PrismaService],
    exports: [BookmarksService]
})
export class BookmarksModule { } 