import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserRole } from '../dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/course.entity';
import { Achievement } from '../../achievements/entities/achievement.entity';
import { Academy } from '../../academies/entities/academy.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'معرف المستخدم' })
    id: string;

    @Column()
    @ApiProperty({ description: 'الاسم الأول' })
    firstName: string;

    @Column()
    @ApiProperty({ description: 'الاسم الأخير' })
    lastName: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'البريد الإلكتروني' })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    @ApiProperty({ description: 'دور المستخدم', enum: UserRole })
    role: UserRole;

    @Column({ nullable: true })
    @ApiProperty({ description: 'البيوغرافيا' })
    bio?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'الصورة الشخصية' })
    avatar?: string;

    @ManyToOne(() => Academy, { nullable: true })
    @ApiProperty({ description: 'الأكاديمية' })
    academy?: Academy;

    @Column(() => [Course])
    @ApiProperty({ description: 'الدورات المسجل فيها' })
    enrolledCourses: Course[];

    @Column(() => [Achievement])
    @ApiProperty({ description: 'المهارات المكتسبة' })
    achievements: Achievement[];

    @CreateDateColumn()
    @ApiProperty({ description: 'تاريخ الإنشاء' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'تاريخ آخر تحديث' })
    updatedAt: Date;
} 