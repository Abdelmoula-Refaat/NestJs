import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Article extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  coverImage: string;

  @Prop([String])
  images: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop([String])
  tagList: string[];

  @Prop({ required: true })
  author: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
