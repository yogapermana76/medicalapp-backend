import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseService } from '../response/response.service';
import { Response, ResponseStatusCode } from 'src/decorators';

@Controller('users')
@ApiTags('users')
@ResponseStatusCode()
export class UsersController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    try {
      const data = await this.usersService.findAll();
      return this.responseService.success('success get user data list', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = this.usersService.findOne(id);
      return this.responseService.success('success get user data', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const data = await this.usersService.update(id, updateUserDto);
      return this.responseService.success('success updated', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.usersService.remove(id);
      return this.responseService.success('success deleted', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
