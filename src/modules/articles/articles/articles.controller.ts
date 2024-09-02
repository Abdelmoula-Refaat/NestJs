import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto ,UpdateArticleDto } from '../dto/articles.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';


@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    
    @Post()
    async create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
        createArticleDto.userId = req.user.userId; 
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    async findAll() {
        return this.articlesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.articlesService.findOne(id);
    }

    
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req) {
        updateArticleDto.userId = req.user.userId; 
        return this.articlesService.update(id, updateArticleDto);
    }

    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.articlesService.delete(id);
    }

    
    @Get('user/:userId')
    async findArticlesByUser(@Param('userId') userId: string) {
        return this.articlesService.findArticlesByUser(userId);
    }
}
