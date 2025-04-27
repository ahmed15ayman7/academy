import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsResolver } from './submissions.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [SubmissionsService, SubmissionsResolver, PrismaService],
    exports: [SubmissionsService]
})
export class SubmissionsModule { } 