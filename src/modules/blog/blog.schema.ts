import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().optional(),
  content: z.string(), // raw html or delta from quill
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  thumbnail: z.string().url().optional()
});
