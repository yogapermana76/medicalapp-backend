import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  medicine_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
