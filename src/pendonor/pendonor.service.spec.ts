import { Test, TestingModule } from '@nestjs/testing';
import { PendonorService } from './pendonor.service';

describe('PendonorService', () => {
  let service: PendonorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendonorService],
    }).compile();

    service = module.get<PendonorService>(PendonorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
