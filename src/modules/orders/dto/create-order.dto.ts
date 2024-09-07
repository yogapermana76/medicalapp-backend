import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 15000, description: 'The total amount of the order' })
  total_amount: number;

  @IsArray()
  @ApiProperty({
    type: [CreateOrderItemDto],
    example: [
      {
        medicine_id: 1,
        quantity: 2,
        price: 5000,
      },
      {
        medicine_id: 2,
        quantity: 1,
        price: 10000,
      },
    ],
    description: 'List of items included in the order',
  })
  @Type(() => CreateOrderItemDto)
  order_items: CreateOrderItemDto[];
}
