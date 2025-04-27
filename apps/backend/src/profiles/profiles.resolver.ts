import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver('Profile')
export class ProfilesResolver {
    constructor(private readonly profilesService: ProfilesService) { }

    @Mutation('createProfile')
    create(@Args('createProfileInput') createProfileInput: CreateProfileInput) {
        return this.profilesService.create(createProfileInput);
    }

    @Query('profiles')
    findAll() {
        return this.profilesService.findAll();
    }

    @Query('profile')
    findOne(@Args('id') id: string) {
        return this.profilesService.findOne(id);
    }

    @Mutation('updateProfile')
    update(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput) {
        return this.profilesService.update(updateProfileInput.id, updateProfileInput);
    }

    @Mutation('removeProfile')
    remove(@Args('id') id: string) {
        return this.profilesService.remove(id);
    }
} 