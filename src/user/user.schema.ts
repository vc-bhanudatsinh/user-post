import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true })
  tokenPass: string;

  @Prop({ unique: [true, 'Duplicate Phone No'] })
  phoneNo: string;

  @Prop({
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
