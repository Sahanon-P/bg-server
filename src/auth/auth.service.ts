import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiKeyGuard } from './guard';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  @UseGuards(ApiKeyGuard)
  async signup(email: string, password: string, username: string) {
    const hash = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: {
        email: email,
        hash: hash,
        username: username,
      },
    });
    return user.id;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid Email');
    }
    const pwMatches = await argon.verify(user.hash, password);
    if (pwMatches) {
      const token = await this.signToken(user.id, user.email, user.username);
      return token;
    } else {
      throw new ForbiddenException('Invalid Password');
    }
  }

  private async signToken(
    userId: string,
    email: string,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
