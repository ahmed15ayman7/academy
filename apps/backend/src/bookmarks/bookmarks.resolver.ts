import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { UpdateBookmarkInput } from './dto/update-bookmark.input';

@Resolver('Bookmark')
export class BookmarksResolver {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Mutation('createBookmark')
    create(@Args('createBookmarkInput') createBookmarkInput: CreateBookmarkInput) {
        return this.bookmarksService.create(createBookmarkInput);
    }

    @Query('bookmarks')
    findAll() {
        return this.bookmarksService.findAll();
    }

    @Query('bookmark')
    findOne(@Args('id') id: string) {
        return this.bookmarksService.findOne(id);
    }

    @Mutation('updateBookmark')
    update(@Args('updateBookmarkInput') updateBookmarkInput: UpdateBookmarkInput) {
        return this.bookmarksService.update(updateBookmarkInput.id, updateBookmarkInput);
    }

    @Mutation('removeBookmark')
    remove(@Args('id') id: string) {
        return this.bookmarksService.remove(id);
    }
} 