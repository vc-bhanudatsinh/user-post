import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { envConfig } from './configs/env.config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [MongooseModule.forRoot(envConfig.dbUrl), UserModule, AuthModule],
})
export class AppModule {}
