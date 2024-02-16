import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(ApiKeyGuard)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto.email, dto.password, dto.username);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
