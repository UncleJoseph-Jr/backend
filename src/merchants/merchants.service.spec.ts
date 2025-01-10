import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsService } from './merchants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('MerchantsService', () => {
  let service: MerchantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantsService,
        {
          provide: PrismaService,
          useValue: {
            // Mock methods of PrismaService if needed
            merchant: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            // Mock methods of JwtService if needed
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MerchantsService>(MerchantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
