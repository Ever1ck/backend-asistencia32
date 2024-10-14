import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolUsuario } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

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
  @Auth(RolUsuario.Usuario) 
  @ApiBearerAuth()
  profile( @ActiveUser() user ) {
    return this.authService.profile(user);
  }

  @Patch('profile')
  @Auth(RolUsuario.Usuario)
  @ApiBearerAuth()
  updateProfile( @ActiveUser() user, @Body() data ) {
    return this.authService.updateProfile(user, data);
  }

}
