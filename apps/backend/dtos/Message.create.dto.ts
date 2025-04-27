import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Message
export class CreateMessageDto {
  @ApiProperty({ type: "string" })
  // Field: senderId, Type: string
  @Column()
  senderId: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
