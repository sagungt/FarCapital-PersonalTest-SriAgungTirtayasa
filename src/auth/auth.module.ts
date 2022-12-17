import EncryptionProvider from 'src/common/encryption.custom.provider';
import { Module } from '@nestjs/common';
import { PetugasModule } from 'src/petugas/petugas.module';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PetugasModule, PassportModule],
  providers: [
    EncryptionProvider,
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
