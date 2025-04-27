import { ApiProperty } from "@nestjs/swagger";
import { User, Lesson } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Attendance
export class UpdateAttendanceDto {
  @ApiProperty({ type: "string" })
  // Field: studentId, Type: string
  @Column()
  studentId: string;

  @ApiProperty({ type: "string" })
  // Field: lessonId, Type: string
  @Column()
  lessonId: string;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;

  @ApiProperty({ type: "string" })
  // Field: method, Type: string
  @Column()
  method: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
