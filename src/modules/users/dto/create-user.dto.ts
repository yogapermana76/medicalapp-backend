import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Jane Doe', description: 'The name of the user' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'securepass123',
    description: 'The password of the user',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'doctor',
    enum: ['patient', 'doctor'],
    description: 'The role of the user, e.g., patient or doctor',
  })
  role: string;
}
