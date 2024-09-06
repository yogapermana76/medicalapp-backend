import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
