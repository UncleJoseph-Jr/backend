import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DriversController', () => {
  let controller: DriversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: DriversService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DriversController>(DriversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
