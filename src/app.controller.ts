import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sequential')
  getSequentialResult(){
    return this.prisma.$transaction([
      this.prisma.artist.findMany(),
      this.prisma.song.findMany(),
      this.prisma.application.findMany(),
    ])
  }
}
