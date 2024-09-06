import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponse } from 'src/helpers/response.helper';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  create(createMedicineDto: CreateMedicineDto) {
    return this.prisma.medicine.create({ data: createMedicineDto });
  }

  async findAll() {
    const data = await this.prisma.medicine.findMany();

    return new SuccessResponse(data);
  }

  findOne(id: number) {
    return this.prisma.medicine.findUnique({ where: { id } });
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return this.prisma.medicine.update({
      where: { id },
      data: updateMedicineDto,
    });
  }

  remove(id: number) {
    return this.prisma.medicine.delete({ where: { id } });
  }
}
