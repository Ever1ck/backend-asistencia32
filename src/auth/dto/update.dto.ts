import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class UpdateProfileDto extends PartialType(RegisterDto) {
    @ApiProperty()
    avatar: string;
}
