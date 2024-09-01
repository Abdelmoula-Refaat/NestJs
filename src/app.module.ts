import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsModule } from './modules/tags/tags.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [AuthModule,MongooseModule.forRoot('mongodb://localhost/nest_iti'), TagsModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
