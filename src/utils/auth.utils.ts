import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IUser } from '../user/user.schema';
import { envConfig } from 'src/configs/env.config';
@Injectable()
export class AuthUtils {
  generateTokenPass() {
    return crypto.randomBytes(10).toString('hex');
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  createJwtToken(id: IUser['id']) {
    return jwt.sign({ id }, envConfig.accessTokenSecret);
  }
}
