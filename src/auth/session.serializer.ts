import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Petugas } from 'src/entities';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    petugas: Omit<Petugas, 'password'>,
    done: (err: Error, _petugas: Omit<Petugas, 'password'>) => void,
  ): void {
    done(null, petugas);
  }

  deserializeUser(
    payload: string,
    done: (err: Error, _payload: string) => void,
  ): void {
    done(null, payload);
  }
}
