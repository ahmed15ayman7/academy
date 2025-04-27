import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { LessonEntity } from "./Lesson.entity";
import { User, Lesson } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Attendance
export class AttendanceEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: studentId, Type: string
  @Column()
  studentId: string;

  @ApiProperty({ type: UserEntity })
  // Field: student, Type: User
  @Column()
  student: User;

  @ApiProperty({ type: "string" })
  // Field: lessonId, Type: string
  @Column()
  lessonId: string;

  @ApiProperty({ type: LessonEntity })
  // Field: lesson, Type: Lesson
  @Column()
  lesson: Lesson;

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
