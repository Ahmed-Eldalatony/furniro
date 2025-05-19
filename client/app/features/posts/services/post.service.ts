// Business logic for the Post feature.
import { IPostRepository } from '../repositories/post.repository'; // Import the repository interface
import { Post } from '../types'; // Import feature types (client-side representation)
// Import the backend DTO if needed for strict type checking against API contract
// import { CreatePostDto } from '@/api/src/dtos/post/create-post.dto'; // Example

export interface IPostService {
  createPost(postData: PostDataForCreation): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
}

// Define a type for the data expected by the service's createPost method
type PostDataForCreation = {
  title: string;
  content: string;
  authorId: string;
};


export class PostService implements IPostService {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData: PostDataForCreation): Promise<Post> {
    // Add any client-side business rules here before calling the repository
    // e.g., basic data validation (though backend should also validate)
    if (!postData.title || !postData.content || !postData.authorId) {
      // In a real app, you might throw a more specific client-side error
      throw new Error('Title, content, and author ID are required.');
    }

    // The repository expects CreatePostDto, ensure the payload matches
    const newPost = await this.postRepository.create(postData);
    // Add any business logic here after creating the post
    // e.g., update local state, show notification
    return newPost;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: number): Promise<Post | null> {
    const post = await this.postRepository.findById(id);
    // Add client-side error handling if post is not found
    return post;
  }
}
