import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) { }

    @Mutation(() => Post)
    createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
        return this.postsService.create(createPostInput);
    }

    @Query(() => [Post], { name: 'posts' })
    findAll() {
        return this.postsService.findAll();
    }

    @Query(() => Post, { name: 'post' })
    findOne(@Args('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Mutation(() => Post)
    updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postsService.update(updatePostInput.id, updatePostInput);
    }

    @Mutation(() => Post)
    removePost(@Args('id') id: string) {
        return this.postsService.remove(id);
    }

    @Mutation(() => Post)
    likePost(@Args('id') id: string) {
        return this.postsService.likePost(id);
    }

    @Mutation(() => Post)
    unlikePost(@Args('id') id: string) {
        return this.postsService.unlikePost(id);
    }

    @Query(() => [Post], { name: 'userPosts' })
    getUserPosts(@Args('userId') userId: string) {
        return this.postsService.getUserPosts(userId);
    }
} 