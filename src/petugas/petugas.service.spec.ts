import { Test, TestingModule } from '@nestjs/testing';
import { PetugasService } from './petugas.service';

describe('PetugasService', () => {
  let service: PetugasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetugasService],
    }).compile();

    service = module.get<PetugasService>(PetugasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
