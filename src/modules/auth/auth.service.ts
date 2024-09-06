import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { roundsOfHashing } from '../users/users.service';
import { SuccessResponse } from 'src/helpers/response.helper';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    const data = await this.prisma.user.create({ data: createUserDto });

    delete data.password;

    return new SuccessResponse(data);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    delete user.password;

    const data = {
      user,
      access_token: this.jwtService.sign({ userId: user.id }),
    };

    return new SuccessResponse(data);
  }
}
