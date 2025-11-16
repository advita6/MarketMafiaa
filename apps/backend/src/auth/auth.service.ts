import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(data: { name: string; email: string; password: string; role: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({ data: { name: data.name, email: data.email, password: hashed, role: data.role as any } });
    const token = this.jwt.sign({ sub: user.id, role: user.role, email: user.email });
    return { token };
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, role: user.role, email: user.email });
    return { token };
  }
  async validateUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
