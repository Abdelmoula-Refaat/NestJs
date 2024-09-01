import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/core/schemas/articles.schema';
import { CreateArticleDto } from '../dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    return await newArticle.save();
  }

  async findAllArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findArticleById(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return article;
  }

  async updateArticle(id: string, updateArticleDto: CreateArticleDto): Promise<Article> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<void> {
    const result = await this.articleModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
  }
}
