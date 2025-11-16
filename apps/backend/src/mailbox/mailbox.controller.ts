import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
@UseGuards(AuthGuard('jwt'))
@Controller('api/mailbox')
export class MailboxController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async list(@Req() req: Request) {
    const user: any = (req as any).user;
    return this.prisma.mailBox.findMany({ where: { userId: user.userId }, orderBy: { sentAt: 'desc' } });
  }
}
