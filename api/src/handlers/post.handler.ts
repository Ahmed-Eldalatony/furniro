// Request handler (Controller) for Post-related endpoints.
import { Request, Response, NextFunction } from 'express';
import { PostService } from '@/services/post.service'; // Import the service
import { CreatePostDto } from '@/dtos/post/create-post.dto'; // Import the DTO
import { ApiResponse } from '@/utils/api-response'; // Import the response utility

export class PostHandler {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    // In a real app, validation middleware would handle DTO validation
    const postData: CreatePostDto = req.body;

    // Basic check (replace with validation middleware later)
    if (!postData.title || !postData.content || !postData.authorId) {
      return res.status(400).json(ApiResponse.error('Missing required fields', 400));
    }

    const newPost = await this.postService.createPost(postData);
    res.status(201).json(ApiResponse.success(newPost, 'Post created successfully', 201));
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await this.postService.getAllPosts();
    res.status(200).json(ApiResponse.success(posts, 'Posts retrieved successfully'));
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const post = await this.postService.getPostById(postId);

    if (!post) {
      return res.status(404).json(ApiResponse.error(`Post with id ${postId} not found`, 404));
    }

    res.status(200).json(ApiResponse.success(post, 'Post retrieved successfully'));
  }
}
