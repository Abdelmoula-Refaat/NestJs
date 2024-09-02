import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    title: string;

    @IsString()
    slug: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsArray()
    images?: string[];

    @IsNumber()
    likes: number;

    @IsArray()
    tagList: string[];

    @IsString()
    author: string;

    @IsString()
    userId: string;
}



export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsArray()
    images?: string[];

    @IsOptional()
    @IsNumber()
    likes?: number;

    @IsOptional()
    @IsArray()
    tagList?: string[];

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    userId?: string; 
}
