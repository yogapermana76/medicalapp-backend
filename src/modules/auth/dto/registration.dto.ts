import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, ValidateIf, IsString } from 'class-validator';

export class DoctorDto {
  @IsNotEmpty()
  @IsString()
  specialization: string;
}

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'hashedpassword123',
    description: 'The password of the user',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'patient',
    enum: ['patient', 'doctor'],
    description: 'The role of the user',
  })
  role: 'patient' | 'doctor';

  // If the role is 'doctor', doctorDto must be filled
  @ValidateIf((o) => o.role === 'doctor')
  @IsNotEmpty()
  @ApiProperty()
  specialization: string;
}
