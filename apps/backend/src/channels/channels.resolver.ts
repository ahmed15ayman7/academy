import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { Message } from './entities/message.entity';

@Resolver(() => Channel)
export class ChannelsResolver {
    constructor(private readonly channelsService: ChannelsService) { }

    @Mutation(() => Channel)
    createChannel(@Args('createChannelInput') createChannelInput: CreateChannelInput) {
        return this.channelsService.create(createChannelInput);
    }

    @Query(() => [Channel], { name: 'channels' })
    findAll() {
        return this.channelsService.findAll();
    }

    @Query(() => Channel, { name: 'channel' })
    findOne(@Args('id') id: string) {
        return this.channelsService.findOne(id);
    }

    @Mutation(() => Channel)
    updateChannel(
        @Args('id') id: string,
        @Args('updateChannelInput') updateChannelInput: UpdateChannelInput,
        @Args('userId') userId: string,
    ) {
        return this.channelsService.update(id, updateChannelInput, userId);
    }

    @Mutation(() => Channel)
    removeChannel(@Args('id') id: string, @Args('userId') userId: string) {
        return this.channelsService.remove(id, userId);
    }

    @Mutation(() => Channel)
    addChannelMember(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('ownerId') ownerId: string,
    ) {
        return this.channelsService.addMember(channelId, userId, ownerId);
    }

    @Mutation(() => Channel)
    removeChannelMember(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('ownerId') ownerId: string,
    ) {
        return this.channelsService.removeMember(channelId, userId, ownerId);
    }

    @Query(() => [Channel], { name: 'userChannels' })
    getUserChannels(@Args('userId') userId: string) {
        return this.channelsService.getUserChannels(userId);
    }

    @Mutation(() => Message)
    sendChannelMessage(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('content') content: string,
    ) {
        return this.channelsService.sendMessage(channelId, userId, content);
    }
} 