// Feature-specific types and interfaces for Posts.
// Note: These types should ideally align with your backend DTOs or database schema.

export interface Post {
  id: number; // Assuming Prisma uses number for Int IDs
  title: string;
  content: string;
  authorId: string;
  createdAt: string; // Assuming ISO string date from backend (Prisma DateTime becomes string in JSON)
}

export interface CreatePostPayload {
  title: string;
  content: string;
  authorId: string;
}
