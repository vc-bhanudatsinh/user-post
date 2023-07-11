import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo?: number;
  username: string;
  id: Types.ObjectId;
}
@Schema()
export class User {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  tokenPass: string;

  @Prop({
    type: SchemaTypes.String,
    unique: [true, 'Duplicate Phone No'],
  })
  phoneNo: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
    default: function () {
      const randomNumber: number = Math.round(
        Math.random() * 1000 +
          parseInt(Date.now().toString().substring(10, 13)),
      );
      return `${this.firstName}.${this.lastName}.${randomNumber}`;
    },
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});
