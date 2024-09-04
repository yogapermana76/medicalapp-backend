import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { order_items, ...orderData } = createOrderDto;
    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        order_items: {
          create: order_items,
        },
      },
      include: { order_items: true },
    });
    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
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
