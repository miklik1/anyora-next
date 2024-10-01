import { Module } from '@nestjs/common';
import { NavbarResolver } from './navbar.resolver';
import { NavbarService } from './navbar.service';
import { NavbarController } from './navbar.controller';

@Module({
  providers: [NavbarResolver, NavbarService],
  controllers: [NavbarController]
})
export class NavbarModule {}
