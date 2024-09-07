import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseService } from '../response/response.service';
import { Response, ResponseStatusCode } from 'src/decorators';

@Controller('/')
@ApiTags('auth')
@ResponseStatusCode()
export class AuthController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.authService.register(createUserDto);
      return this.responseService.success('success register', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    try {
      const data = await this.authService.login(email, password);
      return this.responseService.success('success login', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
