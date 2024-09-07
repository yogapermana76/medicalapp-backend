import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Paracetamol',
    description: 'The name of the medicine',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Pain reliever and fever reducer',
    description: 'Description of the medicine',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 5000, description: 'The price of the medicine' })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 100,
    description: 'The available stock of the medicine',
  })
  stock: number;
}
