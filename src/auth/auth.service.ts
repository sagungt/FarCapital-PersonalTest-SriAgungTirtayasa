import { Inject, Injectable } from '@nestjs/common';
import { Petugas } from 'src/entities';
import { Bcrypt } from 'src/common/encryption.custom.provider';
import { PetugasService } from '../petugas/petugas.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly petugasService: PetugasService,
    @Inject('ENCRYPTION') private readonly encryption: Bcrypt,
  ) {}

  async validatePetugas(email: string, password: string): Promise<Omit<Petugas, 'password'> | null> {
    const user = await this.petugasService.findOne(email);
    const validate = await this.encryption.compare(password, user.password);
    if (validate) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
