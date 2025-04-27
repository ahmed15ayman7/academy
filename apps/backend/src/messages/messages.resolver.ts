import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Resolver(() => Message)
export class MessagesResolver {
    constructor(private readonly messagesService: MessagesService) { }

    @Mutation(() => Message)
    createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
        return this.messagesService.create(createMessageInput);
    }

    @Query(() => [Message], { name: 'messages' })
    findAll() {
        return this.messagesService.findAll();
    }

    @Query(() => Message, { name: 'message' })
    findOne(@Args('id') id: string) {
        return this.messagesService.findOne(id);
    }

    @Mutation(() => Message)
    updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
        return this.messagesService.update(updateMessageInput.id, updateMessageInput);
    }

    @Mutation(() => Message)
    removeMessage(@Args('id') id: string) {
        return this.messagesService.remove(id);
    }

    @Mutation(() => Message)
    markMessageAsRead(@Args('id') id: string) {
        return this.messagesService.markAsRead(id);
    }

    @Query(() => [Message], { name: 'userMessages' })
    getUserMessages(@Args('userId') userId: string) {
        return this.messagesService.getUserMessages(userId);
    }

    @Query(() => [Message], { name: 'conversation' })
    getConversation(
        @Args('userId1') userId1: string,
        @Args('userId2') userId2: string,
    ) {
        return this.messagesService.getConversation(userId1, userId2);
    }
} 