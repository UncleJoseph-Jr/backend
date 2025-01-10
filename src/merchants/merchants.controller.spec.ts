import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('MerchantsController', () => {
  let controller: MerchantsController;
  let service: MerchantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantsController],
      providers: [
        MerchantsService,
        PrismaService,
        JwtService,
      ],
    }).compile();

    controller = module.get<MerchantsController>(MerchantsController);
    service = module.get<MerchantsService>(MerchantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
