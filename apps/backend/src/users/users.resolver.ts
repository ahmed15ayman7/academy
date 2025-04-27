import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Course } from '../courses/entities/course.entity';
import { Achievement } from '../achievements/entities/achievement.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    updateUser(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return this.usersService.update(id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.remove(id);
    }

    @Query(() => [Course], { name: 'enrolledCourses' })
    getEnrolledCourses(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getEnrolledCourses(userId);
    }

    @Query(() => [Course], { name: 'createdCourses' })
    getCreatedCourses(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getCreatedCourses(userId);
    }

    @Query(() => [Achievement], { name: 'achievements' })
    getAchievements(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getAchievements(userId);
    }
} 