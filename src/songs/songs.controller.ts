import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma } from 'generated/prisma';



@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: Prisma.SongUncheckedCreateInput) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(@Query('category') category?:string) {
    return this.songsService.findAll({
      categories: category?
      {
          some: {
            category: {
              name: category
            }
          }
        }
        :
        undefined
   } );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne({id:+id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: Prisma.SongUpdateInput) {
    return this.songsService.update({id:+id}, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove({id:+id});
  }
}
