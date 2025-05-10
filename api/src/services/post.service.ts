// Service for handling Post business logic.
import { PostRepository } from '@/repositories/post.repository'; // Import the repository

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData: { title: string; content: string; authorId: string }) {
    // Add any business rules here before creating the post
    // e.g., check author existence, content length limits, etc.
    const newPost = await this.postRepository.create(postData);
    return newPost;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: string) {
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
