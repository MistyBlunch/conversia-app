import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../config/config';

export class TokenService {
  private secret: string;

  constructor(config: Config) {
    this.secret = config.secret;
  }

  createAccessToken(id: number, name: string) {
    const token = sign({
      id: id,
      name: name
    }, this.secret, {
      expiresIn: '1h'
    });

    return token;
  }

  createRefreshToken() {
    return uuidv4();
  }

  verifyToken(token: string) {
    try {
      const decoded = verify(token, this.secret);

      if(typeof decoded === 'string') {
        return decoded;
      }

      return decoded.id;
    } catch {
      return undefined;
    }
  }
}
