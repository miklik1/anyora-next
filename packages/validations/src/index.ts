import { z } from 'zod';

export const NavbarItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  link: z.string().url('Link must be a valid URL'),
  position: z.number().int().nonnegative('Position must be a non-negative integer'),
  isVisible: z.boolean().optional(),
});
