import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  email: z.string().min(5, 'Email must be at least 5 characters'),
});