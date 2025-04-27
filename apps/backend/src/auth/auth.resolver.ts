import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => AuthResponse)
    async login(@Args('input') input: LoginInput) {
        const user = await this.authService.validateUser(input.email, input.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Mutation(() => AuthResponse)
    async register(@Args('input') input: RegisterInput) {
        return this.authService.register(input);
    }
} 