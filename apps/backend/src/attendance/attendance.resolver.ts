import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

@Resolver(() => Attendance)
export class AttendanceResolver {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Mutation(() => Attendance)
    createAttendance(@Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput) {
        return this.attendanceService.create(createAttendanceInput);
    }

    @Query(() => [Attendance], { name: 'attendances' })
    findAll() {
        return this.attendanceService.findAll();
    }

    @Query(() => Attendance, { name: 'attendance' })
    findOne(@Args('id') id: string) {
        return this.attendanceService.findOne(id);
    }

    @Mutation(() => Attendance)
    updateAttendance(
        @Args('id') id: string,
        @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput
    ) {
        return this.attendanceService.update(id, updateAttendanceInput);
    }

    @Mutation(() => Attendance)
    removeAttendance(@Args('id') id: string) {
        return this.attendanceService.remove(id);
    }

    @Mutation(() => Attendance)
    trackAttendance(
        @Args('lessonId') lessonId: string,
        @Args('studentId') studentId: string,
        @Args('method') method: 'FACE_ID' | 'QR_CODE'
    ) {
        return this.attendanceService.trackAttendance(lessonId, studentId, method);
    }

    @Query(() => [Attendance], { name: 'studentAttendanceStats' })
    getStudentAttendanceStats(@Args('studentId') studentId: string) {
        return this.attendanceService.getStudentAttendanceStats(studentId);
    }
} 