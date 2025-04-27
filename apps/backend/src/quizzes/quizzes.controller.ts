import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizInput, CreateQuestionInput as QuizCreateQuestionInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { CreateQuestionInput } from './dto/create-question.input';
import { CreateAnswerInput } from './dto/create-answer.input';
import { SubmitQuizInput } from './dto/submit-quiz.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface UserPayload {
    id: string;
    email: string;
    role: string;
}

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }

    @Post()
    async create(@Body() createQuizInput: CreateQuizInput) {
        return this.quizzesService.create(createQuizInput);
    }

    @Get()
    async findAll() {
        return this.quizzesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.quizzesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateQuizInput: UpdateQuizInput,
    ) {
        return this.quizzesService.update(id, updateQuizInput);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.quizzesService.remove(id);
    }

    @Post(':quizId/questions')
    async addQuestion(
        @Param('quizId') quizId: string,
        @Body() createQuestionInput: CreateQuestionInput,
    ) {
        const quizQuestionInput: QuizCreateQuestionInput = {
            ...createQuestionInput,
            answers: [],
        };
        return this.quizzesService.addQuestion(quizId, quizQuestionInput);
    }

    @Post('questions/:questionId/answers')
    async addAnswer(
        @Param('questionId') questionId: string,
        @Body() createAnswerInput: CreateAnswerInput,
    ) {
        return this.quizzesService.addAnswer(questionId, createAnswerInput);
    }

    @Post(':id/submit')
    async submitQuiz(
        @Param('id') quizId: string,
        @Body() submitQuizInput: SubmitQuizInput,
        @Req() req: RequestWithUser,
    ) {
        return this.quizzesService.submitQuizAttempt(
            req.user.id,
            quizId,
            submitQuizInput.answers,
        );
    }
} 