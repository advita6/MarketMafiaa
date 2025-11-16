import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
class CreateCompetitionDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() description: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsInt() capacity: number;
  @IsDateString() regDeadline: string;
}
@UseGuards(AuthGuard('jwt'))
@Controller('api/competitions')
export class CompetitionsController {
  constructor(private svc: CompetitionsService) {}
  @Post()
  async create(@Req() req: Request, @Body() body: CreateCompetitionDto) {
    const user: any = (req as any).user;
    if (user.role !== 'organizer') return { statusCode: 403, message: 'Only organizers can create competitions' };
    const data = { title: body.title, description: body.description, tags: body.tags || [], capacity: Number(body.capacity), regDeadline: new Date(body.regDeadline), organizerId: user.userId };
    const comp = await this.svc.create(data);
    return { id: comp.id };
  }
  @Get()
  list() { return this.svc.list(); }
}
