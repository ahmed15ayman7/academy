import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Bookmark
export class CreateBookmarkDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string" })
  // Field: itemId, Type: string
  @Column()
  itemId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
