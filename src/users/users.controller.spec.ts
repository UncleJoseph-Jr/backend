import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'; // เพิ่ม import ของ UsersService

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    // Mocking UsersService
    const mockUsersService = {
      // กำหนด method ที่ต้องใช้ใน UsersService
      findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe' }]), // ตัวอย่าง mock
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService }, // เพิ่มส่วนนี้ให้ mock UsersService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ตัวอย่าง test case สำหรับทดสอบ findAll
  it('should return an array of users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'John Doe' }]);
  });
});
