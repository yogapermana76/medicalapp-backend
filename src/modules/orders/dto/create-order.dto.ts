import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total_amount: number;

  @IsArray()
  @ApiProperty({ type: [CreateOrderItemDto] })
  @Type(() => CreateOrderItemDto)
  order_items: CreateOrderItemDto[];
}
