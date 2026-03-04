import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginDto } from '../../../application/auth/dtos/login.dto.js';
import { AuthService } from '../../../application/auth/usecases/auth.service.usecase.js';
import { ApiController } from '../../../main/decorators/api-controller.decorator.js';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

@ApiController({ tag: 'Auth', path: 'auth', isPublic: true })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    operationId: 'login',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: String,
  })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.validateUser(
      body.id,
      body.password,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
  }
}
