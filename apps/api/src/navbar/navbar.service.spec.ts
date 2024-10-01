import { Test, TestingModule } from '@nestjs/testing';
import { NavbarService } from './navbar.service';
import { PrismaClient } from '@prisma/client';

describe('NavbarService', () => {
  let service: NavbarService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavbarService, PrismaClient],
    }).compile();

    service = module.get<NavbarService>(NavbarService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should create a navbar item', async () => {
    const navbarItem = await service.createNavbarItem({
      label: 'Home',
      link: '/home',
      position: 1,
    });

    expect(navbarItem).toBeDefined();
    expect(navbarItem.label).toBe('Home');
  });
});
