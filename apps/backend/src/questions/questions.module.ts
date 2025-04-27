import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [QuestionsResolver, QuestionsService, PrismaService],
    exports: [QuestionsService],
})
export class QuestionsModule { } 