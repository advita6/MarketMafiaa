import { Module } from '@nestjs/common';
import { BullService } from './bull.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CronService } from './cron.service';
@Module({
  imports: [PrismaModule],
  providers: [BullService, CronService],
  exports: [BullService]
})
export class WorkerModule {}
