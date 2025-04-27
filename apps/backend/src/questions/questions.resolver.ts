import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionsResolver {
    constructor(private readonly questionsService: QuestionsService) { }

    @Mutation(() => Question)
    createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput) {
        return this.questionsService.create(createQuestionInput);
    }

    @Query(() => [Question], { name: 'questions' })
    findAll() {
        return this.questionsService.findAll();
    }

    @Query(() => Question, { name: 'question' })
    findOne(@Args('id') id: string) {
        return this.questionsService.findOne(id);
    }

    @Mutation(() => Question)
    updateQuestion(@Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput) {
        return this.questionsService.update(updateQuestionInput.id, updateQuestionInput);
    }

    @Mutation(() => Question)
    removeQuestion(@Args('id') id: string) {
        return this.questionsService.remove(id);
    }

    @Mutation(() => Question)
    markQuestionAsAnswered(@Args('id') id: string) {
        return this.questionsService.markAsAnswered(id);
    }

    @Mutation(() => Question)
    markQuestionAsUnanswered(@Args('id') id: string) {
        return this.questionsService.markAsUnanswered(id);
    }
} 