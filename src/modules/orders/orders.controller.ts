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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/decorators';
import { Response, ResponseStatusCode } from 'src/decorators';
import { ResponseService } from '../response/response.service';
import { IUserData } from '../auth/interfaces';

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
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
