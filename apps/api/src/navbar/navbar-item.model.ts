import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class NavbarItem {
  @Field(() => Int)
  id!: number;  // Definite assignment assertion

  @Field()
  label!: string;

  @Field()
  link!: string;

  @Field(() => Int)
  position!: number;

  @Field()
  isVisible!: boolean;
}
