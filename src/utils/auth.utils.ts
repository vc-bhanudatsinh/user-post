import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUtils {
  generateTokenPass() {
    return crypto.randomBytes(10).toString('hex');
  }
}
