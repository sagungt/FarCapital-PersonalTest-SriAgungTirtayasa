import { Test, TestingModule } from '@nestjs/testing';
import { PetugasController } from './petugas.controller';

describe('PetugasController', () => {
  let controller: PetugasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetugasController],
    }).compile();

    controller = module.get<PetugasController>(PetugasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
