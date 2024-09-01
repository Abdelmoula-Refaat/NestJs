import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '../dto/articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @Get()
  async findAllArticles() {
    return await this.articlesService.findAllArticles();
  }

  @Get(':id')
  async findArticleById(@Param('id') id: string) {
    return await this.articlesService.findArticleById(id);
  }

  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateArticleDto: CreateArticleDto) {
    return await this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    await this.articlesService.deleteArticle(id);
    return { message: 'Article deleted successfully' };
  }
}
