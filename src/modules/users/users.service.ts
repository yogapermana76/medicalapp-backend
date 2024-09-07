import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const data = await this.prisma.user.findUnique({
      where: { id },
      include: { doctor: true },
    });

    if (!data) {
      throw new Error('user not found');
    }

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const isFound = await this.prisma.user.findUnique({ where: { id } });

    if (!isFound) {
      throw new Error('user not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const isFound = await this.prisma.user.findUnique({ where: { id } });

    if (!isFound) {
      throw new Error('user not found');
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
