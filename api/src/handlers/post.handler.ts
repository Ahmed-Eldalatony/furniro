// Request handler (Controller) for Post-related endpoints.
import { Request, Response, NextFunction } from 'express';
import { IPostService } from '@/services/post.service'; // Import the service interface
import { CreatePostDto } from '@/dtos/post/create-post.dto'; // Import the DTO
import { ApiResponse } from '@/utils/api-response'; // Import the response utility

export class PostHandler {
  private postService: IPostService;

  constructor(postService: IPostService) {
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
    const postId = parseInt(req.params.id, 10); // Parse ID to number for Prisma

    if (isNaN(postId)) {
       return res.status(400).json(ApiResponse.error('Invalid post ID', 400));
    }

    const post = await this.postService.getPostById(postId);

    if (!post) {
      return res.status(404).json(ApiResponse.error(`Post with id ${postId} not found`, 404));
    }

    res.status(200).json(ApiResponse.success(post, 'Post retrieved successfully'));
  }
}
