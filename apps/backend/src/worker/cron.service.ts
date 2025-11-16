import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { BullService } from './bull.service';
@Injectable()
export class CronService {
  constructor(private prisma: PrismaService, private bull: BullService) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const now = new Date();
    const in24 = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const comps = await this.prisma.competition.findMany({ where: { regDeadline: { gte: now } } });
    const candidates = comps.filter((c) => { return c.regDeadline.getTime() <= in24.getTime() && c.regDeadline.getTime() >= now.getTime(); });
    for (const comp of candidates) {
      const regs = await this.prisma.registration.findMany({ where: { competitionId: comp.id } });
      for (const r of regs) {
        await this.bull.enqueue('reminder:notify', { registrationId: r.id, userId: r.userId, competitionId: comp.id });
      }
    }
  }
}
