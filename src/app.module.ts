import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PendonorController } from './pendonor/pendonor.controller';
import { PendonorModule } from './pendonor/pendonor.module';
import { PetugasModule } from './petugas/petugas.module';
import { AuthModule } from './auth/auth.module';
import entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities,
      }),
      inject: [ConfigService],
    }),
    PendonorModule,
    PetugasModule,
    AuthModule,
  ],
  controllers: [AppController, PendonorController],
  providers: [AppService],
})
export class AppModule {}
