import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the medicine',
  })
  medicine_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10,
    description: 'The quantity of the medicine ordered',
  })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5000,
    description: 'The price of the medicine for this order item',
  })
  price: number;
}
