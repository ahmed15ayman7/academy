import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';

@InputType()
export class CreateAttendanceInput {
    @Field()
    @IsNotEmpty()
    studentId: string;

    @Field()
    @IsNotEmpty()
    lessonId: string;

    @Field()
    @IsNotEmpty()
    @IsEnum(['PRESENT', 'ABSENT', 'LATE'])
    status: string;

    @Field()
    @IsNotEmpty()
    @IsEnum(['FACE_ID', 'QR_CODE'])
    method: string;
} 