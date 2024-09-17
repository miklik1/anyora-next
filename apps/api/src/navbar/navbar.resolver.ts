import { Resolver, Query } from '@nestjs/graphql';
import { NavbarService } from './navbar.service';
import { NavbarItem } from './navbar-item.model';

@Resolver()
export class NavbarResolver {
  constructor(private readonly navbarService: NavbarService) {}

  @Query(() => [NavbarItem])
  getNavbarItems() {
    return this.navbarService.getNavbarItems();
  }
}
