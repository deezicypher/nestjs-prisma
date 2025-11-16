import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService){}
  create(createSongDto: Prisma.SongCreateInput) {
    return this.prisma.song.create({
      data:createSongDto
    })
  }

  findAll() {
    return this.prisma.song.findMany();
  }

  findOne(id: number) {
    return this.prisma.song.findUnique({where:{id}});
  }

  update(where: Prisma.SongWhereUniqueInput, updateSongDto: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where,
      data: updateSongDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
