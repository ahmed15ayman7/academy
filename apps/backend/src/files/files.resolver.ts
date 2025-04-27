import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Resolver('File')
export class FilesResolver {
    constructor(private readonly filesService: FilesService) { }

    @Mutation('createFile')
    create(@Args('createFileInput') createFileInput: CreateFileInput) {
        return this.filesService.create(createFileInput);
    }

    @Query('files')
    findAll() {
        return this.filesService.findAll();
    }

    @Query('file')
    findOne(@Args('id') id: string) {
        return this.filesService.findOne(id);
    }

    @Mutation('updateFile')
    update(@Args('updateFileInput') updateFileInput: UpdateFileInput) {
        return this.filesService.update(updateFileInput.id, updateFileInput);
    }

    @Mutation('removeFile')
    remove(@Args('id') id: string) {
        return this.filesService.remove(id);
    }
} 