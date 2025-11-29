import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';


@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService){}

  create(createSongDto: CreateSongDto & {filePath:string}) {
     const { categories,artistId,...songData } = createSongDto;

    const prismaCategories = categories
        ?.map(c => {
          if (c.category?.create) {
            return {
              assignedBy: c.assignedBy ?? 'system',
              category: { create: { name: c.category.create.name } },
            };
          }

          if (c.category?.connect) {
            return {
              assignedBy: c.assignedBy ?? 'system',
              category: { connect: { id: c.category.connect.id } },
            };
          }

    
          return null;
        })
         .filter(
          (c): c is { assignedBy: string; category: any } => c !== null
        );


    return this.prisma.song.create({
      data:{
        ...songData,
        artist: createSongDto.artistId
        ? { connect: { id: Number(createSongDto.artistId) } }
        : undefined,
         categories: prismaCategories?.length
      ? { create: prismaCategories }
      : undefined,
      }
    })
  }

  findAll(where:Prisma.SongWhereInput) {
    return this.prisma.song.findMany({where,
      include: {
    categories: {
      include: {
        category: true
      }
    }
  }
    })
    //return this.prisma.song.findMany({include: {artist:true,categories:true}});
  }

  findOne(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.findUnique({where});
  }

  update(where: Prisma.SongWhereUniqueInput, updateSongDto: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where,
      data: updateSongDto
    });
  }

  remove(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.delete({where})
  }
}
