import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PendonorController } from './pendonor.controller';
import { PendonorService } from './pendonor.service';
import { Pendonor } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pendonor])],
  controllers: [PendonorController],
  providers: [PendonorService],
  exports: [TypeOrmModule, PendonorService],
})
export class PendonorModule {}
