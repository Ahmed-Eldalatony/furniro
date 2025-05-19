// Data access logic for the Post feature.
import { api } from '@/api'; // Import the configured API client
import { Post, CreatePostPayload } from '../types'; // Import feature types

export interface IPostRepository {
  create(postData: CreatePostPayload): Promise<Post>;
  getAll(): Promise<Post[]>; // Added getAll method
  getById(id: number): Promise<Post | null>; // Added getById method
}

export class PostRepository implements IPostRepository {
  private readonly baseUrl = '/posts'; // Base URL for post endpoints

  async create(postData: CreatePostPayload): Promise<Post> {
    try {
      // The backend expects CreatePostDto, which matches CreatePostPayload structure
      const response = await api.post<Post>(this.baseUrl, postData);
      return response.data;
    } catch (error) {
      // Handle API errors (e.g., log, throw custom error)
      console.error('Error creating post:', error);
      throw error; // Re-throw or throw a custom error
    }
  }

  async getAll(): Promise<Post[]> {
    try {
      const response = await api.get<Post[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Post | null> {
    try {
      const response = await api.get<Post>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      // Handle 404 specifically if needed, otherwise re-throw
      if (error.response && error.response.status === 404) {
        return null; // Post not found
      }
      console.error(`Error fetching post with ID ${id}:`, error);
      throw error;
    }
  }
}
