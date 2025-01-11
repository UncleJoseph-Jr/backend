import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriversService, PrismaService],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
