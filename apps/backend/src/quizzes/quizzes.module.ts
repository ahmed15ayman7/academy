import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [QuizzesResolver, QuizzesService, PrismaService],
    exports: [QuizzesService],
})
export class QuizzesModule { } 