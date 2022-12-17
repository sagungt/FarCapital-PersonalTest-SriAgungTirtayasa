import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pendonor {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    nullable: false,
  })
    nama: string;

  @Column({
    nullable: false,
    type: 'int2',
  })
    jenisKelamin: number;

  @Column({
    type: 'date',
    nullable: false,
  })
    tanggalLahir: string;

  @Column({
    type: 'text',
    nullable: false,
  })
    alamat: string;

  @Column({
    type: 'boolean',
    default: false,
  })
    layak: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
    lolos: boolean;
}
