import { Module } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { AcademiesResolver } from './academies.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [AcademiesResolver, AcademiesService, PrismaService],
    exports: [AcademiesService],
})
export class AcademiesModule { } 