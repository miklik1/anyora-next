import { Injectable } from '@nestjs/common';
import { NavbarItem } from './navbar-item.model';

// TODO

import { prisma } from '@repo/db';
import { NavbarItemSchema } from '@repo/validations';


@Injectable()
export class NavbarService {
  async getNavbarItems(): Promise<NavbarItem[]> {
    return await prisma.navbarItem.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async createNavbarItem(data: { label: string; link: string; position: number; isVisible?: boolean }) {
    // Validate data using Zod
    const parsedData = NavbarItemSchema.parse(data);

    // Create new navbar item
    return await prisma.navbarItem.create({
      data: parsedData,
    });
  }

  async updateNavbarItem(id: number, data: { label?: string; link?: string; position?: number; isVisible?: boolean }) {
    // Validate data before updating
    const parsedData = NavbarItemSchema.partial().parse(data); // Use partial for optional fields

    // Update navbar item
    return await prisma.navbarItem.update({
      where: { id },
      data: parsedData,
    });
  }

  async deleteNavbarItem(id: number) {
    return await prisma.navbarItem.delete({
      where: { id },
    });
  }
}
