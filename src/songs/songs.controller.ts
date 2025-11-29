import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, ParseFilePipe, HttpStatus, BadRequestException } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IsPngValidator } from 'src/validators/is-png.validator';



@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file',{
      storage:diskStorage({
      destination: './upload/covers',
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
      }),
      limits: {
        fileSize:200_000
      }
}
)
  )
  async create(@Body() createSongDto: CreateSongDto,
  @UploadedFile(new ParseFilePipe(
    {
      validators:[
        new IsPngValidator(),
        
      ],
      exceptionFactory: () => 
        new BadRequestException('File is required and must be a valid type'),
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }
  ))
  file: Express.Multer.File
) {
    if(!file) throw new BadRequestException('File is required')
    const filePath = `/upload/covers/${file.filename}`


    return this.songsService.create({...createSongDto, filePath});
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
