import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

@Injectable()
export class AttendanceService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService
    ) { }

    async create(createAttendanceInput: CreateAttendanceInput) {
        const attendance = await this.prisma.attendance.create({
            data: createAttendanceInput
        });

        // إرسال إشعار للأهل في حالة الغياب
        if (createAttendanceInput.status === 'ABSENT') {
            await this.notificationsService.create({
                title: 'غياب الطالب',
                message: `تم تسجيل غياب الطالب في الدرس ${createAttendanceInput.lessonId}`,
                userId: createAttendanceInput.studentId,
                type: 'ATTENDANCE'
            });
        }

        return attendance;
    }

    async findAll() {
        return this.prisma.attendance.findMany();
    }

    async findOne(id: string) {
        return this.prisma.attendance.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateAttendanceInput: UpdateAttendanceInput) {
        return this.prisma.attendance.update({
            where: { id },
            data: updateAttendanceInput
        });
    }

    async remove(id: string) {
        return this.prisma.attendance.delete({
            where: { id }
        });
    }

    async trackAttendance(lessonId: string, studentId: string, method: 'FACE_ID' | 'QR_CODE') {
        const attendance = await this.prisma.attendance.create({
            data: {
                lessonId,
                studentId,
                status: 'PRESENT',
                method
            }
        });

        return attendance;
    }

    async getStudentAttendanceStats(studentId: string) {
        const stats = await this.prisma.attendance.groupBy({
            by: ['status'],
            where: { studentId },
            _count: true
        });

        return stats;
    }
} 