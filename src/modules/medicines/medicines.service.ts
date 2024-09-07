import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  create(createMedicineDto: CreateMedicineDto) {
    return this.prisma.medicine.create({ data: createMedicineDto });
  }

  async findAll() {
    return await this.prisma.medicine.findMany();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const data = await this.prisma.medicine.findUnique({ where: { id } });

    if (!data) {
      throw new Error('medicine not found');
    }

    return data;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const isFound = await this.prisma.medicine.findUnique({ where: { id } });

    if (!isFound) {
      throw new Error('medicine not found');
    }

    const data = await this.prisma.medicine.update({
      where: { id },
      data: updateMedicineDto,
    });

    return data;
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const isFound = await this.prisma.medicine.findUnique({ where: { id } });

    if (!isFound) {
      throw new Error('medicine not found');
    }

    const data = await this.prisma.medicine.delete({ where: { id } });

    return data;
  }
}
