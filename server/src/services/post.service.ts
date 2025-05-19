// Service for handling Post business logic.
import { IPostRepository } from '@/repositories/post.repository'; // Import the repository interface
import { Post } from '@prisma/client'; // Import Prisma Post type

export interface IPostService {
  createPost(postData: { title: string; content: string; authorId: string }): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
}

export class PostService implements IPostService {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData: { title: string; content: string; authorId: string }): Promise<Post> {
    // Add any business rules here before creating the post
    // e.g., check author existence, content length limits, etc.
    const newPost = await this.postRepository.create(postData);
    return newPost;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: number): Promise<Post | null> {
    const post = await this.postRepository.findById(id);
    // Add error handling if post is not found
    if (!post) {
      // In a real app, you'd throw a custom error like NotFoundError
      // throw new NotFoundError(`Post with id ${id} not found`);
      return null; // Or throw an error
    }
    return post;
  }
}
