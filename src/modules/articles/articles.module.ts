import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { Article, ArticleSchema } from 'src/core/schemas/articles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

