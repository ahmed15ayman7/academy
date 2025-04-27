import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [NotificationsModule],
    providers: [AttendanceResolver, AttendanceService, PrismaService],
    exports: [AttendanceService]
})
export class AttendanceModule { } 