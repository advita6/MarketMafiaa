import { Headers, Param, Post, Req, UseGuards, Controller } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { BullService } from '../worker/bull.service';
@UseGuards(AuthGuard('jwt'))
@Controller('api/competitions')
export class RegistrationsController {
  constructor(private prisma: PrismaService, private bull: BullService) {}
  @Post(':id/register')
  async register(@Req() req: Request, @Param('id') id: string, @Headers('idempotency-key') idempotencyKey: string) {
    const user: any = (req as any).user;
    if (user.role !== 'participant') return { statusCode: 403, message: 'Only participants can register' };
    if (!idempotencyKey) return { statusCode: 400, message: 'Idempotency-Key header required' };
    const compId = Number(id);
    const existing = await this.prisma.registration.findFirst({ where: { idempotencyKey, userId: user.userId, competitionId: compId } });
    if (existing) return { status: 'ok', registrationId: existing.id };
    const lockKey = compId;
    await this.prisma.$executeRaw`SELECT pg_advisory_xact_lock(${lockKey})`;
    return await this.prisma.$transaction(async (tx) => {
      const comp = await tx.competition.findUnique({ where: { id: compId } });
      if (!comp) throw { statusCode: 404, message: 'Competition not found' };
      if (new Date() > comp.regDeadline) throw { statusCode: 400, message: 'Registration deadline passed' };
      const regsCount = await tx.registration.count({ where: { competitionId: compId } });
      if (regsCount >= comp.capacity) throw { statusCode: 409, message: 'Competition is full' };
      const already = await tx.registration.findFirst({ where: { userId: user.userId, competitionId: compId } });
      if (already) return { status: 'ok', registrationId: already.id };
      const reg = await tx.registration.create({ data: { userId: user.userId, competitionId: compId, idempotencyKey, status: 'confirmed' } });
      await this.bull.enqueue('registration:confirmation', { registrationId: reg.id, userId: reg.userId, competitionId: reg.competitionId });
      return { status: 'created', registrationId: reg.id };
    });
  }
}
