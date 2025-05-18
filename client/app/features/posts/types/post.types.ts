// Feature-specific types and interfaces for Posts.

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string; // Assuming ISO string date from backend
}

export interface CreatePostPayload {
  title: string;
  content: string;
  authorId: string;
}
