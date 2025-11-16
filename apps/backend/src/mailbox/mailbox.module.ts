import { Module } from '@nestjs/common';
import { MailboxController } from './mailbox.controller';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [MailboxController]
})
export class MailboxModule {}
