import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Resolver(() => Course)
export class CoursesResolver {
    constructor(private readonly coursesService: CoursesService) { }

    @Mutation(() => Course)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
    createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
        return this.coursesService.create(createCourseInput);
    }

    @Query(() => [Course], { name: 'courses' })
    findAll() {
        return this.coursesService.findAll();
    }

    @Query(() => Course, { name: 'course' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.coursesService.findOne(id);
    }

    @Mutation(() => Course)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
    updateCourse(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    ) {
        return this.coursesService.update(id, updateCourseInput);
    }

    @Mutation(() => Course)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
    removeCourse(@Args('id', { type: () => ID }) id: string) {
        return this.coursesService.remove(id);
    }

    @Mutation(() => Course)
    @UseGuards(JwtAuthGuard)
    enrollInCourse(
        @Args('courseId', { type: () => ID }) courseId: string,
        @Args('studentId', { type: () => ID }) studentId: string,
    ) {
        return this.coursesService.enrollStudent(courseId, studentId);
    }

    @Query(() => [Course], { name: 'courseLessons' })
    getCourseLessons(@Args('courseId', { type: () => ID }) courseId: string) {
        return this.coursesService.getCourseLessons(courseId);
    }

    @Query(() => [Course], { name: 'courseQuizzes' })
    getCourseQuizzes(@Args('courseId', { type: () => ID }) courseId: string) {
        return this.coursesService.getCourseQuizzes(courseId);
    }

    @Query(() => [Course], { name: 'courseStudents' })
    getCourseStudents(@Args('courseId', { type: () => ID }) courseId: string) {
        return this.coursesService.getCourseStudents(courseId);
    }
} 