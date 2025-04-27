import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [FilesService, FilesResolver, PrismaService],
    exports: [FilesService]
})
export class FilesModule { } 