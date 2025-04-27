import { ApiProperty } from "@nestjs/swagger";
import { Course, File, Quiz, Attendance } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Lesson
export class UpdateLessonDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: videoUrl, Type: string
  @Column()
  videoUrl?: string;

  @ApiProperty({ type: "string" })
  // Field: courseId, Type: string
  @Column()
  courseId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
