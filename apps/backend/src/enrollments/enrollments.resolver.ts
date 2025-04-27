import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { UpdateEnrollmentInput } from './dto/update-enrollment.input';

@Resolver('Enrollment')
export class EnrollmentsResolver {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Mutation('createEnrollment')
    create(@Args('createEnrollmentInput') createEnrollmentInput: CreateEnrollmentInput) {
        return this.enrollmentsService.create(createEnrollmentInput);
    }

    @Query('enrollments')
    findAll() {
        return this.enrollmentsService.findAll();
    }

    @Query('enrollment')
    findOne(@Args('id') id: string) {
        return this.enrollmentsService.findOne(id);
    }

    @Mutation('updateEnrollment')
    update(@Args('updateEnrollmentInput') updateEnrollmentInput: UpdateEnrollmentInput) {
        return this.enrollmentsService.update(updateEnrollmentInput.id, updateEnrollmentInput);
    }

    @Mutation('removeEnrollment')
    remove(@Args('id') id: string) {
        return this.enrollmentsService.remove(id);
    }
} 