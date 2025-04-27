import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [LessonsResolver, LessonsService, PrismaService],
    exports: [LessonsService],
})
export class LessonsModule { } 