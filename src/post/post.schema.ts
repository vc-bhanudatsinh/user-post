import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';
import { User } from '../user/user.schema';

export type PostDocument = HydratedDocument<Posts>;

interface IComments {
  userId: Types.ObjectId;
  comment: string;
  mentions: [Types.ObjectId];
  createdAt: Date;
}

export interface IPosts {
  title: string;
  description: string;
  mentions: [Types.ObjectId];
  shareOnly: [Types.ObjectId];
  userId: Types.ObjectId;
  comments: IComments[];
}

@Schema()
export class Posts {
  @Prop({
    type: SchemaTypes.String,
  })
  title: string;

  @Prop({
    type: SchemaTypes.String,
  })
  description: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
  })
  mentions: [Types.ObjectId];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({
    type: [SchemaTypes.ObjectId],
  })
  shareOnly: [Types.ObjectId];

  @Prop({
    type: SchemaTypes.String,
    enum: ['private', 'public'],
  })
  postType: string;

  @Prop({
    userId: SchemaTypes.ObjectId,
    comment: SchemaTypes.String,
    mentions: [SchemaTypes.ObjectId],
    createdAt: {
      type: SchemaTypes.Date,
      default: new Date(),
    },
  })
  comments: [IComments];

  @Prop({
    type: SchemaTypes.Date,
    default: new Date(),
  })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
