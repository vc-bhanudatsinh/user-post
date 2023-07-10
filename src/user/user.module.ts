import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthUtils } from 'src/utils/auth.utils';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VerifyJwtGuard } from '../guard/verify-jwt.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthUtils,
    UserService,
    {
      provide: 'APP_GUARD',
      useClass: VerifyJwtGuard,
    },
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
})
export class UserModule {}
