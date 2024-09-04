import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService],
  imports: [PrismaModule],
  exports: [MedicinesService],
})
export class MedicinesModule {}
