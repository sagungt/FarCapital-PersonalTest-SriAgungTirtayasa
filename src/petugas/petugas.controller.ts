import {
  Body, Controller, Get, Inject, Post, Render, Res, UseFilters, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CredentialPetugas } from 'src/dtos';
import { LoginGuard } from 'src/common/guards/login.guard';
import { AuthExceptionFilter } from '../common/filters/auth-exception.filter';
import { PetugasService } from './petugas.service';

@Controller('petugas')
@UseFilters(AuthExceptionFilter)
export class PetugasController {
  constructor(private readonly petugasService: PetugasService) {}

  @Get('/daftar')
  @Render('petugas/daftar')
  daftarView(): void {}

  @Get('/login')
  @Render('petugas/login')
  loginView(@Res() res: Response): void {
    res.redirect('/pendonor/list');
  }

  @Post('/daftar')
  @UsePipes(ValidationPipe)
  async daftar(
    @Body() body: CredentialPetugas,
    @Res() res: Response,
  ): Promise<void> {
    await this.petugasService.registerPetugas(body);
    res.redirect('/petugas/login');
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(
    @Res() res: Response,
  ): void {
    res.redirect('/pendonor/list');
  }

  @Get('/list-pendonor')
  @Render('petugas/list')
  listPendonor() {

  }
}
