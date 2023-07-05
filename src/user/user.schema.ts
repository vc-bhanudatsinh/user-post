import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  tokenPass: string;

  @Prop()
  phoneNo: string;

  @Prop({
    required: true,
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
