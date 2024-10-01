import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { NavbarService } from './navbar.service';
import { NavbarItem } from './navbar-item.model';

@Controller('navbar')
export class NavbarController {
  constructor(private readonly navbarService: NavbarService) {}

  // 1. Get all navbar items
  @Get()
  async getNavbarItems(): Promise<NavbarItem[]> {
    return this.navbarService.getNavbarItems();
  }

  // 2. Get a single navbar item by ID
  @Get(':id')
  async getNavbarItem(@Param('id', ParseIntPipe) id: number): Promise<NavbarItem> {
    return this.navbarService.getNavbarItem(id);
  }

  // 3. Create a new navbar item
  @Post()
  async createNavbarItem(
    @Body() data: { label: string; link: string; position: number; isVisible?: boolean },
  ): Promise<NavbarItem> {
    return this.navbarService.createNavbarItem(data);
  }

  // 4. Update an existing navbar item by ID
  @Put(':id')
  async updateNavbarItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { label?: string; link?: string; position?: number; isVisible?: boolean },
  ): Promise<NavbarItem> {
    return this.navbarService.updateNavbarItem(id, data);
  }

  // 5. Delete a navbar item by ID
  @Delete(':id')
  async deleteNavbarItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.navbarService.deleteNavbarItem(id);
  }
}
