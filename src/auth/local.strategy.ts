import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Petugas } from 'src/entities';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Omit<Petugas, 'password'>> {
    const petugas = await this.authService.validatePetugas(email, password);
    if (!petugas) {
      throw new UnauthorizedException();
    }
    return petugas;
  }
}
