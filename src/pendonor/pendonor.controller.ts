import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../common/filters/auth-exception.filter';
import { LoginGuard } from '../common/guards/login.guard';
import { PendonorService } from './pendonor.service';
import { FormPendonor } from '../dtos';

@Controller('pendonor')
@UseFilters(AuthExceptionFilter)
export class PendonorController {
  constructor(private pendonorService: PendonorService) {}

  @Get('/daftar')
  @Render('pendonor/daftar')
  async daftarView(): Promise<any> {}

  @Post('/daftar')
  async daftar(
    @Body() body: FormPendonor,
    @Res() res: Response,
  ): Promise<any> {
    const pendonor = await this.pendonorService.tambahPendonor(body);
    res.cookie('allow', 'true');
    res.redirect(`/pendonor/donor/${pendonor.id}`);
  }

  @Get('/donor/:id')
  @Render('pendonor/donor')
  async donorView(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const pendonor = await this.pendonorService.findById(id);
    return {
      lakiLaki: pendonor.jenisKelamin === 1,
      perempuan: pendonor.jenisKelamin === 1,
      id,
    };
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/list')
  @Render('pendonor/list')
  async list(): Promise<{ data: any }> {
    const semuaPendonor = await this.pendonorService.semuaPendonor();
    return {
      data: semuaPendonor.map(
        (pendonor) => ({
          ...pendonor,
          jenisKelamin: pendonor.jenisKelamin === 1 ? 'Laki-laki' : 'Perempuan',
        }),
      ),
    };
  }

  @Post('/validate/:id')
  validate(@Body() body: any, @Param('id', ParseIntPipe) id: number): any {
    const valid = Object.values(body).every((v) => v === '2');
    this.pendonorService.aturLayak(id, valid);
  }

  @Get('/detail/:id')
  @Render('pendonor/detail')
  async detail(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const pendonor = await this.pendonorService.findById(id);
    return { ...pendonor };
  }

  @Post('/lolos/:id')
  async lolos(
    @Body() body: any,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<any> {
    const pendonor = await this.pendonorService.findById(id);
    let lolos = true;
    const {
      usia, izin, bb, temp, sistole, diastole, nadi, hemo,
    } = body;
    if (Number(usia) < 17) {
      lolos = false;
    } else if (!(Number(usia) === 17 && izin === 'on')) {
      lolos = false;
    }

    if (Number(bb) < 45) lolos = false;

    if (!(Number(temp) >= 36.6 && Number(temp) <= 37.5)) lolos = false;

    if (!(Number(sistole) >= 110 && Number(sistole) <= 160)) lolos = false;

    if (!(Number(diastole) >= 70 && Number(diastole) <= 100)) lolos = false;

    if (!(Number(nadi) >= 50 && Number(nadi) <= 100)) lolos = false;

    if (pendonor.jenisKelamin === 1) {
      if (Number(hemo) < 12) lolos = false;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (Number(hemo) < 12.5) lolos = false;
    }
    this.pendonorService.aturLolos(id, lolos);

    return res.redirect('/pendonor/list');
  }
}
