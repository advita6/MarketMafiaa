import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
class SignupDto {
  @IsNotEmpty() name: string;
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() role: 'participant' | 'organizer';
}
class LoginDto {
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
}
@Controller('api/auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('signup')
  signup(@Body() body: SignupDto) { return this.auth.signup(body as any); }
  @Post('login')
  login(@Body() body: LoginDto) { return this.auth.login(body.email, body.password); }
}
