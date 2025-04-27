import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsResolver } from './enrollments.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [EnrollmentsService, EnrollmentsResolver, PrismaService],
    exports: [EnrollmentsService]
})
export class EnrollmentsModule { } 