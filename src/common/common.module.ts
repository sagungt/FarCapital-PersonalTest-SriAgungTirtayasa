import { Global, Module } from '@nestjs/common';
import EncryptionService from './encryption.custom.provider';

@Global()
@Module({
  providers: [
    EncryptionService,
  ],
  exports: [EncryptionService],
})
export class CommonModule {}
