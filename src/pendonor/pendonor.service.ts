import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FormPendonor } from 'src/dtos';
import { Repository } from 'typeorm';
import { Pendonor } from '../entities';

@Injectable()
export class PendonorService {
  constructor(
    @InjectRepository(Pendonor) private pendonorRepository: Repository<Pendonor>,
  ) {}

  async tambahPendonor(payload: FormPendonor): Promise<Pendonor> {
    const pendonorBaru = await this.pendonorRepository.create(payload);
    await this.pendonorRepository.save(pendonorBaru);
    return pendonorBaru;
  }

  async semuaPendonor(): Promise<Pendonor[]> {
    return this.pendonorRepository.find();
  }

  async aturLayak(id: number, layak: boolean): Promise<any> {
    const pendonor = await this.pendonorRepository.findOne({
      where: { id },
    });
    await this.pendonorRepository.save({
      ...pendonor,
      layak,
    });
    return { message: 'berhasil' };
  }

  async aturLolos(id: number, lolos: boolean): Promise<any> {
    const pendonor = await this.pendonorRepository.findOne({
      where: { id },
    });
    await this.pendonorRepository.save({
      ...pendonor,
      lolos,
    });
    return { message: 'berhasil' };
  }

  async findById(id: number): Promise<Pendonor> {
    return this.pendonorRepository.findOne({
      where: { id },
    });
  }
}
