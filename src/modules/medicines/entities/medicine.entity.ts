import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class MedicineEntity implements Medicine {
  constructor(partial: Partial<MedicineEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @Exclude()
  stock: number;
}
