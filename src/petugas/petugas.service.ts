import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialPetugas } from 'src/dtos';
import { Petugas } from '../entities/petugas.entity';
import { Bcrypt } from '../common/encryption.custom.provider';

@Injectable()
export class PetugasService {
  constructor(
    @Inject('ENCRYPTION') private readonly encryption: Bcrypt,
    @InjectRepository(Petugas) private readonly petugasRepository: Repository<Petugas>,
  ) {}

  async registerPetugas(payload: CredentialPetugas): Promise<any> {
    const hashedPassword = await this.encryption.hash(payload.password, 11);
    const petugasBaru = await this.petugasRepository.create(
      {
        ...payload,
        password: hashedPassword,
      },
    );
    await this.petugasRepository.save(petugasBaru);
    return { message: 'Berhasil didaftarkan' };
  }

  async findOne(email: string): Promise<Petugas> {
    return this.petugasRepository.findOne({
      where: { email },
    });
  }
}
