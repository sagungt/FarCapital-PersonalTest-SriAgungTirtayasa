import { Test, TestingModule } from '@nestjs/testing';
import { PendonorController } from './pendonor.controller';

describe('PendonorController', () => {
  let controller: PendonorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendonorController],
    }).compile();

    controller = module.get<PendonorController>(PendonorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
