import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto,UpdateArticleDto } from '../dto/articles.dto';
import { Article } from 'src/core/schemas/articles.schema';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const newArticle = new this.articleModel(createArticleDto);
        return newArticle.save();
    }

    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }

    async findOne(id: string): Promise<Article> {
        const article = await this.articleModel.findById(id).exec();
        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }

    async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
        if (!updatedArticle) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return updatedArticle;
    }

    async delete(id: string): Promise<void> {
        const result = await this.articleModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
    }

    async findArticlesByUser(userId: string): Promise<Article[]> {
        return this.articleModel.find({ userId }).exec();
    }
}
