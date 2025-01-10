import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service'; // เพิ่มการ import MerchantsService

describe('MerchantsController', () => {
  let controller: MerchantsController;
  let service: MerchantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantsController],
      providers: [MerchantsService], // เพิ่ม MerchantsService ใน providers
    }).compile();

    controller = module.get<MerchantsController>(MerchantsController);
    service = module.get<MerchantsService>(MerchantsService); // เพื่อให้สามารถเข้าถึง service
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined(); // ทดสอบว่า service ก็ถูกสร้างขึ้นมาได้
  });
});
