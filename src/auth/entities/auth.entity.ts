import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
    @ApiProperty()
    email: string;

    @ApiProperty()
    accessToken: string;
  }