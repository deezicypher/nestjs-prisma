import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ApplicationsModule } from './applications/applications.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [SongsModule, ArtistsModule, UsersModule, ApplicationsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
