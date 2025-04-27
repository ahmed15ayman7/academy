import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';

@Resolver(() => Group)
export class GroupsResolver {
    constructor(private readonly groupsService: GroupsService) { }

    @Mutation(() => Group)
    createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
        return this.groupsService.create(createGroupInput);
    }

    @Query(() => [Group], { name: 'groups' })
    findAll() {
        return this.groupsService.findAll();
    }

    @Query(() => Group, { name: 'group' })
    findOne(@Args('id') id: string) {
        return this.groupsService.findOne(id);
    }

    @Mutation(() => Group)
    updateGroup(
        @Args('id') id: string,
        @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
        @Args('userId') userId: string,
    ) {
        return this.groupsService.update(id, updateGroupInput, userId);
    }

    @Mutation(() => Group)
    removeGroup(@Args('id') id: string, @Args('userId') userId: string) {
        return this.groupsService.remove(id, userId);
    }

    @Mutation(() => Group)
    addGroupMember(
        @Args('groupId') groupId: string,
        @Args('userId') userId: string,
        @Args('adminId') adminId: string,
    ) {
        return this.groupsService.addMember(groupId, userId, adminId);
    }

    @Mutation(() => Group)
    removeGroupMember(
        @Args('groupId') groupId: string,
        @Args('userId') userId: string,
        @Args('adminId') adminId: string,
    ) {
        return this.groupsService.removeMember(groupId, userId, adminId);
    }

    @Query(() => [Group], { name: 'userGroups' })
    getUserGroups(@Args('userId') userId: string) {
        return this.groupsService.getUserGroups(userId);
    }
} 