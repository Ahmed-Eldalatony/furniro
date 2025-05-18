// Business logic for the Post feature.
import { IPostRepository } from '../repositories/post.repository'; // Import the repository interface
import { Post, CreatePostPayload } from '../types'; // Import feature types

export interface IPostService {
  createPost(postData: CreatePostPayload): Promise<Post>;
  // Add other post-related business logic methods here
}

export class PostService implements IPostService {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData: CreatePostPayload): Promise<Post> {
    // Add any client-side business rules here before calling the repository
    // e.g., basic data validation (though backend should also validate)
    if (!postData.title || !postData.content || !postData.authorId) {
      throw new Error('Title, content, and author ID are required.');
    }

    const newPost = await this.postRepository.create(postData);
    // Add any business logic here after creating the post
    // e.g., update local state, show notification
    return newPost;
  }

  // Implement other methods like getAllPosts, getPostById
}
