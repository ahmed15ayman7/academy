import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Resolver(() => Lesson)
export class LessonsResolver {
    constructor(private readonly lessonsService: LessonsService) { }

    @Mutation(() => Lesson)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
        return this.lessonsService.create(createLessonInput);
    }

    @Query(() => [Lesson], { name: 'lessons' })
    findAll() {
        return this.lessonsService.findAll();
    }

    @Query(() => Lesson, { name: 'lesson' })
    findOne(@Args('id') id: string) {
        return this.lessonsService.findOne(id);
    }

    @Mutation(() => Lesson)
    updateLesson(@Args('updateLessonInput') updateLessonInput: UpdateLessonInput) {
        return this.lessonsService.update(updateLessonInput.id, updateLessonInput);
    }

    @Mutation(() => Lesson)
    removeLesson(@Args('id') id: string) {
        return this.lessonsService.remove(id);
    }

    @Mutation(() => Lesson)
    markLessonAsCompleted(
        @Args('lessonId') lessonId: string,
        @Args('userId') userId: string,
    ) {
        return this.lessonsService.markLessonAsCompleted(lessonId, userId);
    }

    @Mutation(() => Lesson)
    markLessonAsIncomplete(
        @Args('lessonId') lessonId: string,
        @Args('userId') userId: string,
    ) {
        return this.lessonsService.markLessonAsIncomplete(lessonId, userId);
    }
} 