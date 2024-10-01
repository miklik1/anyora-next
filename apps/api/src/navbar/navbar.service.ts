import { BadRequestException, Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NavbarItemSchema, NavbarItemUpdateSchema } from './navbar.validation';
import { NavbarItem } from './navbar-item.model';

const prisma = new PrismaClient();
const logger = new Logger('NavbarService');

@Injectable()
export class NavbarService {
  
  async getNavbarItems(): Promise<NavbarItem[]> {
    try {
      logger.log('Fetching all navbar items');
      const items = await prisma.navbarItem.findMany({
        orderBy: { position: 'asc' },
      });
      logger.log(`Found ${items.length} navbar items`);
      return items;
    } catch (error) {
      logger.error('Error fetching navbar items', error);
      throw new InternalServerErrorException('Failed to fetch navbar items');
    }
  }

  async getNavbarItem(id: number): Promise<NavbarItem> {
    try {
      logger.log(`Fetching navbar item with ID: ${id}`);
      const item = await prisma.navbarItem.findUnique({ where: { id } });
      if (!item) {
        throw new NotFoundException(`Navbar item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      logger.error(`Error fetching navbar item ID: ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch navbar item');
    }
  }

  async createNavbarItem(data: { label: string; link: string; position: number; isVisible?: boolean }) {
    try {
      logger.log('Validating navbar item data');
      const parsedData = NavbarItemSchema.parse(data);
      logger.log('Creating a new navbar item');
      const newItem = await prisma.navbarItem.create({ data: parsedData });
      logger.log('Navbar item created successfully');
      return newItem;
    } catch (error) {
      logger.error('Error creating navbar item', error);
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new InternalServerErrorException('Failed to create navbar item');
    }
  }

  async updateNavbarItem(id: number, data: { label?: string; link?: string; position?: number; isVisible?: boolean }) {
    try {
      logger.log(`Validating update data for navbar item ID: ${id}`);
      const parsedData = NavbarItemUpdateSchema.parse(data);
      logger.log(`Updating navbar item with ID: ${id}`);
      const updatedItem = await prisma.navbarItem.update({
        where: { id },
        data: parsedData,
      });
      logger.log(`Navbar item ID: ${id} updated successfully`);
      return updatedItem;
    } catch (error) {
      logger.error(`Error updating navbar item ID: ${id}`, error);
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new InternalServerErrorException('Failed to update navbar item');
    }
  }

  async deleteNavbarItem(id: number) {
    try {
      logger.log(`Deleting navbar item with ID: ${id}`);
      const deletedItem = await prisma.navbarItem.delete({ where: { id } });
      logger.log(`Navbar item ID: ${id} deleted successfully`);
      return deletedItem;
    } catch (error) {
      logger.error(`Error deleting navbar item ID: ${id}`, error);
      throw new InternalServerErrorException('Failed to delete navbar item');
    }
  }
}
