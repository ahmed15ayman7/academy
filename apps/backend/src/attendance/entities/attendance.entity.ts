import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@ObjectType()
export class Attendance {
    @Field(() => ID)
    id: string;

    @Field(() => User)
    student: User;

    @Field(() => Lesson)
    lesson: Lesson;

    @Field()
    status: 'PRESENT' | 'ABSENT' | 'LATE';

    @Field()
    method: 'FACE_ID' | 'QR_CODE';

    @Field()
    timestamp: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
} 