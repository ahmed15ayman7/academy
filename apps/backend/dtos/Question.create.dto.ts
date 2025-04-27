import { ApiProperty } from "@nestjs/swagger";
import { Quiz } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Question
export class CreateQuestionDto {
  @ApiProperty({ type: "string" })
  // Field: text, Type: string
  @Column()
  text: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: options, Type: object
  @Column()
  options?: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: answer, Type: object
  @Column()
  answer: object;

  @ApiProperty({ type: "string" })
  // Field: quizId, Type: string
  @Column()
  quizId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
