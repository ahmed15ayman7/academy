import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from '../../dtos/Attendance.create.dto';
import { UpdateAttendanceDto } from '../../dtos/Attendance.update.dto';
import { AttendanceDto } from '../../dtos/Attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post()
    async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<AttendanceDto> {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Get()
    async findAll(): Promise<AttendanceDto[]> {
        return this.attendanceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AttendanceDto> {
        return this.attendanceService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAttendanceDto: UpdateAttendanceDto,
    ): Promise<AttendanceDto> {
        return this.attendanceService.update(id, updateAttendanceDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.attendanceService.remove(id);
    }
} 