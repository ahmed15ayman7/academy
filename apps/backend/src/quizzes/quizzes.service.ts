import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizInput, CreateQuestionInput, CreateAnswerInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Injectable()
export class QuizzesService {
    constructor(private prisma: PrismaService) { }

    async create(createQuizInput: CreateQuizInput) {
        return this.prisma.quiz.create({
            data: {
                title: createQuizInput.title,
                description: createQuizInput.description,
                courseId: createQuizInput.courseId,
                timeLimit: createQuizInput.timeLimit,
                passingScore: createQuizInput.passingScore,
                questions: {
                    create: createQuizInput.questions.map(question => ({
                        text: question.text,
                        type: question.type,
                        points: question.points,
                        answers: {
                            create: question.answers.map(answer => ({
                                text: answer.text,
                                isCorrect: answer.isCorrect,
                            })),
                        },
                    })),
                },
            },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.quiz.findMany({
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        return quiz;
    }

    async update(id: string, updateQuizInput: UpdateQuizInput) {
        return this.prisma.quiz.update({
            where: { id },
            data: {
                title: updateQuizInput.title,
                description: updateQuizInput.description,
                timeLimit: updateQuizInput.timeLimit,
                passingScore: updateQuizInput.passingScore,
            },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });
    }

    async remove(id: string) {
        return this.prisma.quiz.delete({
            where: { id },
        });
    }

    async addQuestion(quizId: string, createQuestionInput: CreateQuestionInput) {
        return this.prisma.question.create({
            data: {
                text: createQuestionInput.text,
                type: createQuestionInput.type,
                points: createQuestionInput.points,
                quizId,
                answers: {
                    create: createQuestionInput.answers.map(answer => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    })),
                },
            },
            include: {
                answers: true,
            },
        });
    }

    async addAnswer(questionId: string, createAnswerInput: CreateAnswerInput) {
        return this.prisma.answer.create({
            data: {
                text: createAnswerInput.text,
                isCorrect: createAnswerInput.isCorrect,
                questionId,
            },
        });
    }

    async submitQuizAttempt(userId: string, quizId: string, answers: { questionId: string; answerId: string }[]) {
        const quiz = await this.findOne(quizId);
        let score = 0;
        let totalPoints = 0;

        for (const question of quiz.questions) {
            totalPoints += question.points;
            const userAnswer = answers.find(a => a.questionId === question.id);
            if (userAnswer) {
                const answer = question.answers.find(a => a.id === userAnswer.answerId);
                if (answer?.isCorrect) {
                    score += question.points;
                }
            }
        }

        const percentage = (score / totalPoints) * 100;
        const passed = percentage >= quiz.passingScore;

        return this.prisma.quizAttempt.create({
            data: {
                userId,
                quizId,
                score: percentage,
                passed,
                answers: {
                    create: answers.map(answer => ({
                        questionId: answer.questionId,
                        answerId: answer.answerId,
                    })),
                },
            },
            include: {
                answers: true,
            },
        });
    }
} 