import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { envConfig } from 'src/configs/env.config';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/user.schema';
import { AuthUtils } from 'src/utils/auth.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: envConfig.accessTokenSecret,
      signOptions: {
        expiresIn: 60 * 60 * 8,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUtils],
})
export class AuthModule {}
