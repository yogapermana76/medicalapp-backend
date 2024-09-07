import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IUserData } from '../auth/interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, user: IUserData) {
    const { order_items, ...orderData } = createOrderDto;

    try {
      // Start a transaction
      const order = await this.prisma.$transaction(async (prisma) => {
        // Check and update stock
        await Promise.all(
          order_items.map(async (item) => {
            const medicine = await prisma.medicine.findUnique({
              where: { id: item.medicine_id },
            });

            if (!medicine) {
              throw new NotFoundException(
                `Medicine with ID ${item.medicine_id} not found.`,
              );
            }

            if (medicine.stock < item.quantity) {
              throw new BadRequestException(
                `Insufficient stock for medicine with ID ${item.medicine_id}.`,
              );
            }

            // Update the stock
            await prisma.medicine.update({
              where: { id: item.medicine_id },
              data: { stock: medicine.stock - item.quantity },
            });
          }),
        );

        // Create the order
        return prisma.order.create({
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
      });

      return order;
    } catch (error) {
      // Handle error and rollback
      throw error;
    }
  }

  async findAll(user: IUserData) {
    return await this.prisma.order.findMany({
      where: { user_id: user.id },
      include: { order_items: true },
    });
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Order ID must be a number.');
    }

    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { order_items: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { order_items, ...orderData } = updateOrderDto;

    const isFound = await this.prisma.order.findUnique({ where: { id } });

    if (!isFound) {
      throw new NotFoundException('Order not found.');
    }

    return await this.prisma.order.update({
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
    if (isNaN(id)) {
      throw new BadRequestException('Order ID must be a number.');
    }

    const isFound = await this.prisma.order.findUnique({ where: { id } });

    if (!isFound) {
      throw new NotFoundException('Order not found.');
    }

    return await this.prisma.order.delete({ where: { id } });
  }
}
