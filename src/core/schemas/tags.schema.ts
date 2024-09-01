import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Tag extends Document {
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  createdBy: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
