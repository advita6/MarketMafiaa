import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { MailboxModule } from './mailbox/mailbox.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerModule } from './worker/worker.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CompetitionsModule,
    RegistrationsModule,
    MailboxModule,
    ScheduleModule.forRoot(),
    WorkerModule
  ]
})
export class AppModule {}
