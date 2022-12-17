import { TypeOrmModule } from '@nestjs/typeorm';
import EncryptionProvider from 'src/common/encryption.custom.provider';
import { Module } from '@nestjs/common';
import { Petugas } from '../entities/petugas.entity';
import { PetugasController } from './petugas.controller';
import { PetugasService } from './petugas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Petugas])],
  controllers: [PetugasController],
  providers: [
    EncryptionProvider,
    PetugasService,
  ],
  exports: [
    TypeOrmModule,
    PetugasService,
  ],
})
export class PetugasModule {}
