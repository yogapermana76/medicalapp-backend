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
  findAll() {
    try {
      const data = this.medicinesService.findAll();
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MedicineEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.remove(id);
  }
}
