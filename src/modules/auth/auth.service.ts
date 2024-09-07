import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registrationDto: RegistrationDto) {
    const { email, role } = registrationDto;

    // Check if user already exists
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      registrationDto.password,
      roundsOfHashing,
    );

    registrationDto.password = hashedPassword;

    // Create the user
    const userData = await this.prisma.user.create({
      data: {
        name: registrationDto.name,
        email: registrationDto.email,
        password: registrationDto.password,
        role: registrationDto.role,
      },
      include: {
        doctor: true,
      },
    });

    // Create a Doctor record if the role is 'doctor'
    if (role === 'doctor') {
      const { specialization } = registrationDto;

      if (!specialization) {
        throw new UnauthorizedException(
          'Specialization is required for doctor',
        );
      }

      await this.prisma.doctor.create({
        data: {
          user_id: userData.id,
          specialization: specialization || null, // Handle specialization as null if not provided
        },
      });
    }

    // Clean up password from the response data
    delete userData.password;

    return userData;
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

    return data;
  }
}
