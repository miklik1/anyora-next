import { Module } from '@nestjs/common';
import { NavbarResolver } from './navbar.resolver';
import { NavbarService } from './navbar.service';

@Module({
  providers: [NavbarResolver, NavbarService],
})
export class NavbarModule {}
