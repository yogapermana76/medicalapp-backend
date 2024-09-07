import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IUserData } from '../auth/interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, user: IUserData) {
    const { order_items, ...orderData } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        status: 'pending',
        user_id: user.id,
        order_items: {
          create: order_items,
        },
      },
      include: { order_items: true },
    });

    return order;
  }

  async findAll(user: IUserData) {
    return await this.prisma.order.findMany({
      where: { user_id: user.id },
      include: { order_items: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { order_items: true },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { order_items, ...orderData } = updateOrderDto;
    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        order_items: {
          deleteMany: {},
          create: order_items,
        },
      },
      include: { order_items: true },
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
