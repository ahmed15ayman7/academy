import { ApiProperty } from "@nestjs/swagger";
import {
  UserRole,
  Academy,
  Profile,
  Enrollment,
  Achievement,
  Notification,
  Message,
  Post,
  Group,
  Channel,
  Bookmark,
  Submission,
  Attendance,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for User
export class UpdateUserDto {
  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ type: "string" })
  // Field: firstName, Type: string
  @Column()
  firstName: string;

  @ApiProperty({ type: "string" })
  // Field: lastName, Type: string
  @Column()
  lastName: string;

  @ApiProperty({ enum: UserRole })
  // Field: role, Type: UserRole
  @Column()
  role: UserRole;

  @ApiProperty({ type: "string", nullable: true })
  // Field: subRole, Type: string
  @Column()
  subRole?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: avatar, Type: string
  @Column()
  avatar?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: academyId, Type: string
  @Column()
  academyId?: string;
}
