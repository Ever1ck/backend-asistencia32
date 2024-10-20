import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolUsuario } from '@prisma/client';
import { AllAuth, Auth } from './decorators/auth.decorator';
import { ActiveUsuario } from 'src/common/decorators/active-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @AllAuth(RolUsuario.Usuario)
  @ApiBearerAuth()
  profile(@ActiveUsuario() usuario) {
    return this.authService.profile(usuario);
  }

  @Patch('profile')
  @AllAuth(RolUsuario.Usuario)
  @ApiBearerAuth()
  updateProfile( @ActiveUsuario() usuario, @Body() data ) {
    return this.authService.updateProfile(usuario, data);
  }

}
