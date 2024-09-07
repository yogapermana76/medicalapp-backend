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
import { Response, ResponseStatusCode } from 'src/decorators';
import { ResponseService } from '../response/response.service';

@Controller('medicines')
@ApiTags('medicines')
export class MedicinesController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly medicinesService: MedicinesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MedicineEntity })
  @ResponseStatusCode()
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    try {
      const data = await this.medicinesService.create(createMedicineDto);
      return this.responseService.success('success created', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get()
  @ApiOkResponse({ type: MedicineEntity, isArray: true })
  async findAll() {
    try {
      const data = await this.medicinesService.findAll();
      return this.responseService.success(
        'success get medicine data list',
        data,
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.medicinesService.findOne(id);
      return this.responseService.success('success get medicine data', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    try {
      const data = await this.medicinesService.update(id, updateMedicineDto);
      return this.responseService.success('success updated', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = this.medicinesService.remove(id);
      return this.responseService.success('success deleted', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
