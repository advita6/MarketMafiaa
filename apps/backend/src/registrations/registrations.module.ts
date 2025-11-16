import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BullService } from '../worker/bull.service';
@Module({
  imports: [PrismaModule],
  controllers: [RegistrationsController],
  providers: [BullService]
})
export class RegistrationsModule {}
