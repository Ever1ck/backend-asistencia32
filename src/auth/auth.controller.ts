import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UploadedFile, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolUsuario } from '@prisma/client';
import { AllAuth, Auth } from './decorators/auth.decorator';
import { ActiveUsuario } from 'src/common/decorators/active-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fs } from 'fs';

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
  @ApiOkResponse()
  @AllAuth(RolUsuario.Usuario)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: async (req, file, callback) => {
          const dir = './uploads/profiles';
          const files = await fs.readdir(dir);
          const avatarFiles = files.filter(file => file.startsWith('Avatar_'));
          let newIndex = avatarFiles.length + 1;
          const newFileName = `Avatar_${newIndex}${extname(file.originalname)}`;
          callback(null, newFileName);
        },
      }),
    }),
  )
  updateProfile(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @ActiveUsuario() usuario, @Body() data ) {
    if (file) {
      data.avatar = `uploads/profiles/${file.filename}`;
    }
    return this.authService.updateProfile(usuario, data);
  }

}
