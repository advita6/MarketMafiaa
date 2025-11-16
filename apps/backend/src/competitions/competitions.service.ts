import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService) {}
  create(data: any) { return this.prisma.competition.create({ data }); }
  list() { return this.prisma.competition.findMany({ include: { organizer: true } }); }
  findById(id: number) { return this.prisma.competition.findUnique({ where: { id } }); }
}
