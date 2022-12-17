import {
  Controller, Get, Render, Res, UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get()
  async index(@Res() res: Response): Promise<void> {
    res.redirect('/pendonor/daftar');
  }

  @Get('/error')
  @Render('error')
  error(): void {}
}
