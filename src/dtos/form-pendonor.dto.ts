import { IsNotEmpty, IsDate } from 'class-validator';

export class FormPendonor {
  @IsNotEmpty()
    nama: string;

  @IsNotEmpty()
    jenisKelamin: number;

  @IsNotEmpty()
  @IsDate()
    tanggalLahir: string;
}
