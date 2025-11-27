import { Controller, Get, ParseFilePipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
HttpStatus,
ParseFilePipeBuilder,
UploadedFile,
UseInterceptors,
} from '@nestjs/common';
import { IsPngValidator } from './validators/is-png.validator';



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


  @Post('upload')
  @UseInterceptors(FileInterceptor('file',))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
  }

  @Post('upload-png')
    @UseInterceptors(
      FileInterceptor('file', {
      storage: diskStorage({
      destination: './upload/files',
      filename: (req, file, cb) => {
      cb(null, file.originalname);
      }}),
      limits:{
        fileSize:200_000
      }
      }
    )
    )
    uploadFileWithValidation(
    @UploadedFile( new ParseFilePipe({validators:[
      new IsPngValidator()
    ],
   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,})

  
    )
    file: Express.Multer.File,
    ) {
    console.log(file);
    return {
    messge: 'file uploaded successfully!',
    };
    }

}
