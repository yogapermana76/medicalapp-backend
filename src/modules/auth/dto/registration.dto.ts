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
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  role: 'patient' | 'doctor';

  // If the role is 'doctor', doctorDto must be filled
  @ValidateIf((o) => o.role === 'doctor')
  @IsNotEmpty()
  @ApiProperty()
  specialization: string;
}
