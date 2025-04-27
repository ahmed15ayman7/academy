import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementInput } from './dto/create-achievement.input';
import { UpdateAchievementInput } from './dto/update-achievement.input';

@Resolver(() => Achievement)
export class AchievementsResolver {
    constructor(private readonly achievementsService: AchievementsService) { }

    @Mutation(() => Achievement)
    createAchievement(@Args('createAchievementInput') createAchievementInput: CreateAchievementInput) {
        return this.achievementsService.create(createAchievementInput);
    }

    @Query(() => [Achievement], { name: 'achievements' })
    findAll() {
        return this.achievementsService.findAll();
    }

    @Query(() => Achievement, { name: 'achievement' })
    findOne(@Args('id') id: string) {
        return this.achievementsService.findOne(id);
    }

    @Mutation(() => Achievement)
    updateAchievement(@Args('updateAchievementInput') updateAchievementInput: UpdateAchievementInput) {
        return this.achievementsService.update(updateAchievementInput.id, updateAchievementInput);
    }

    @Mutation(() => Achievement)
    removeAchievement(@Args('id') id: string) {
        return this.achievementsService.remove(id);
    }

    @Mutation(() => Achievement)
    assignAchievementToUser(
        @Args('achievementId') achievementId: string,
        @Args('userId') userId: string,
    ) {
        return this.achievementsService.assignAchievementToUser(achievementId, userId);
    }

    @Mutation(() => Achievement)
    removeAchievementFromUser(
        @Args('achievementId') achievementId: string,
        @Args('userId') userId: string,
    ) {
        return this.achievementsService.removeAchievementFromUser(achievementId, userId);
    }
} 