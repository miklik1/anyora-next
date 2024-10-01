import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NavbarService } from './navbar.service';
import { NavbarItem } from './navbar-item.model';

@Resolver(() => NavbarItem)
export class NavbarResolver {
  constructor(private readonly navbarService: NavbarService) {}

  // Query to get all navbar items
  @Query(() => [NavbarItem], { name: 'getNavbarItems' })
  async getNavbarItems() {
    return this.navbarService.getNavbarItems();
  }

  // Query to get a single navbar item by ID
  @Query(() => NavbarItem, { name: 'getNavbarItem' })
  async getNavbarItem(@Args('id', { type: () => Int }) id: number) {
    const item = await this.navbarService.getNavbarItem(id);
    if (!item) {
      throw new NotFoundException(`Navbar item with ID ${id} not found`);
    }
    return item;
  }

  // Mutation to create a new navbar item
  @Mutation(() => NavbarItem, { name: 'createNavbarItem' })
  async createNavbarItem(
    @Args('label') label: string,
    @Args('link') link: string,
    @Args('position', { type: () => Int }) position: number,
    @Args('isVisible', { type: () => Boolean, nullable: true }) isVisible?: boolean,
  ) {
    try {
      return await this.navbarService.createNavbarItem({ label, link, position, isVisible });
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid input data');
    }
  }

  // Mutation to update a navbar item by ID
  @Mutation(() => NavbarItem, { name: 'updateNavbarItem' })
  async updateNavbarItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('label', { nullable: true }) label?: string,
    @Args('link', { nullable: true }) link?: string,
    @Args('position', { type: () => Int, nullable: true }) position?: number,
    @Args('isVisible', { type: () => Boolean, nullable: true }) isVisible?: boolean,
  ) {
    try {
      return await this.navbarService.updateNavbarItem(id, { label, link, position, isVisible });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update navbar item');
    }
  }

  // Mutation to delete a navbar item by ID
  @Mutation(() => NavbarItem, { name: 'deleteNavbarItem' })
  async deleteNavbarItem(@Args('id', { type: () => Int }) id: number) {
    return await this.navbarService.deleteNavbarItem(id);
  }
}
