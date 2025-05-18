// Data access logic for the Post feature.
import { api } from '@/api'; // Import the configured API client
import { Post, CreatePostPayload } from '../types'; // Import feature types

export interface IPostRepository {
  create(postData: CreatePostPayload): Promise<Post>;
  // Add other post-related data access methods here (e.g., getAll, getById)
}

export class PostRepository implements IPostRepository {
  private readonly baseUrl = '/posts'; // Base URL for post endpoints

  async create(postData: CreatePostPayload): Promise<Post> {
    try {
      const response = await api.post<Post>(this.baseUrl, postData);
      return response.data;
    } catch (error) {
      // Handle API errors (e.g., log, throw custom error)
      console.error('Error creating post:', error);
      throw error; // Re-throw or throw a custom error
    }
  }

  // Implement other methods like getAll, getById, update, delete
}
