import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(
    private prisma: PrismaService
  ){}
  create(createArtistDto: Prisma.ArtistCreateInput) {
    return this.prisma.artist.create({
      data:createArtistDto
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
