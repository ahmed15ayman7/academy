import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { CreateQuestionInput } from './dto/create-quiz.input';
import { CreateAnswerInput } from './dto/create-quiz.input';

@Resolver('Quiz')
export class QuizzesResolver {
    constructor(private readonly quizzesService: QuizzesService) { }

    @Mutation('createQuiz')
    create(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
        return this.quizzesService.create(createQuizInput);
    }

    @Query('quizzes')
    findAll() {
        return this.quizzesService.findAll();
    }

    @Query('quiz')
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.quizzesService.findOne(id);
    }

    @Mutation('updateQuiz')
    update(@Args('updateQuizInput') updateQuizInput: UpdateQuizInput) {
        return this.quizzesService.update(updateQuizInput.id, updateQuizInput);
    }

    @Mutation('removeQuiz')
    remove(@Args('id', { type: () => ID }) id: string) {
        return this.quizzesService.remove(id);
    }

    @Mutation('addQuestion')
    addQuestion(
        @Args('quizId', { type: () => ID }) quizId: string,
        @Args('question') question: CreateQuestionInput,
    ) {
        return this.quizzesService.addQuestion(quizId, question);
    }

    @Mutation('addAnswer')
    addAnswer(
        @Args('questionId', { type: () => ID }) questionId: string,
        @Args('answer') answer: CreateAnswerInput,
    ) {
        return this.quizzesService.addAnswer(questionId, answer);
    }

    @Mutation('submitQuizAttempt')
    submitQuizAttempt(
        @Args('quizId', { type: () => ID }) quizId: string,
        @Args('userId', { type: () => ID }) userId: string,
        @Args('answers', { type: () => [String] }) answers: string[],
    ) {
        return this.quizzesService.submitQuizAttempt(quizId, userId, answers);
    }
} 