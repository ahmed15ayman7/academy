import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AcademiesService } from './academies.service';
import { Academy } from './entities/academy.entity';
import { CreateAcademyInput } from './dto/create-academy.input';
import { UpdateAcademyInput } from './dto/update-academy.input';

@Resolver(() => Academy)
export class AcademiesResolver {
    constructor(private readonly academiesService: AcademiesService) { }

    @Mutation(() => Academy)
    createAcademy(@Args('createAcademyInput') createAcademyInput: CreateAcademyInput) {
        return this.academiesService.create(createAcademyInput);
    }

    @Query(() => [Academy], { name: 'academies' })
    findAll() {
        return this.academiesService.findAll();
    }

    @Query(() => Academy, { name: 'academy' })
    findOne(@Args('id') id: string) {
        return this.academiesService.findOne(id);
    }

    @Mutation(() => Academy)
    updateAcademy(@Args('updateAcademyInput') updateAcademyInput: UpdateAcademyInput) {
        return this.academiesService.update(updateAcademyInput.id, updateAcademyInput);
    }

    @Mutation(() => Academy)
    removeAcademy(@Args('id') id: string) {
        return this.academiesService.remove(id);
    }

    @Mutation(() => Academy)
    addInstructor(
        @Args('academyId') academyId: string,
        @Args('instructorId') instructorId: string,
    ) {
        return this.academiesService.addInstructor(academyId, instructorId);
    }

    @Mutation(() => Academy)
    removeInstructor(
        @Args('academyId') academyId: string,
        @Args('instructorId') instructorId: string,
    ) {
        return this.academiesService.removeInstructor(academyId, instructorId);
    }
} 