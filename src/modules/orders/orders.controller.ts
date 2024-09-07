import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/decorators';
import { Response, ResponseStatusCode } from 'src/decorators';
import { ResponseService } from '../response/response.service';
import { IUserData } from '../auth/interfaces';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ResponseStatusCode()
export class OrdersController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: IUserData,
  ) {
    try {
      const data = await this.ordersService.create(createOrderDto, user);
      return this.responseService.success('success created', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get()
  async findAll(@User() user: IUserData) {
    try {
      const data = await this.ordersService.findAll(user);
      return this.responseService.success('success get order data list', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      const data = this.ordersService.findOne(id);
      return this.responseService.success('success get order data', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const data = this.ordersService.update(id, updateOrderDto);
      return this.responseService.success('success updated', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      const data = this.ordersService.remove(id);
      return this.responseService.success('success deleted', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
