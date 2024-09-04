import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total_amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  order_items: CreateOrderItemDto[];
}
