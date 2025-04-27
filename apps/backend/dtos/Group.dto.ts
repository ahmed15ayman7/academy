import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Group
export class GroupDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: UserEntity })
  // Field: members, Type: User[]
  @Column()
  members: User[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
