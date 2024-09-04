import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MedicineEntity } from './entities/medicine.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('medicines')
@ApiTags('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MedicineEntity })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity, isArray: true })
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.remove(id);
  }
}
