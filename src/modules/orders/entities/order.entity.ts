import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

export class OrderEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the order',
  })
  id: number;

  @ApiProperty({ example: 15000, description: 'The total amount of the order' })
  total_amount: number;

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
  @IsArray()
  @Type(() => CreateOrderItemDto)
  order_items: CreateOrderItemDto[];
}
