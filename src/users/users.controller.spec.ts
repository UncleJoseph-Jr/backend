import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockJwtService = {
      // Mock the methods of JwtService that are used by JwtAuthGuard
      verify: jest.fn().mockReturnValue({ userId: 1 }),
    };

    const mockUsersService = {
      findUserById: jest.fn((id) => {
        if (id === 1) {
          return { id: 1, name: 'John Doe' };
        } else {
          throw new BadRequestException('User not found');
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return user profile for valid userId', async () => {
    const req = { user: { id: 1 } };
    const result = await controller.getProfile(req);
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should throw error for invalid userId', async () => {
    const req = { user: { id: 999 } };
    await expect(controller.getProfile(req)).rejects.toThrow('User not found');
  });

  it('should throw error for missing userId', async () => {
    const req = { user: {} };
    await expect(controller.getProfile(req)).rejects.toThrow(
      'Invalid user token or missing userId',
    );
  });
});
