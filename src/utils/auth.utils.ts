import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUtils {
  generateTokenPass() {
    return crypto.randomBytes(10).toString('hex');
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
