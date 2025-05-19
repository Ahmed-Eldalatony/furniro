// Repository for handling Post data access using Prisma.

import { PrismaClient, Post } from '@prisma/client';
import { CreatePostDto } from '../dtos/post/create-post.dto';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Define the interface for the repository methods
export interface IPostRepository {
  create(postData: CreatePostDto): Promise<Post>;
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post | null>; // Prisma uses number for Int IDs
}

export class PostRepository implements IPostRepository {

  async create(postData: CreatePostDto): Promise<Post> {
    const newPost = await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        authorId: postData.authorId,
        // Prisma handles createdAt automatically if schema uses DateTime @default(now())
        // Since schema uses String, we'll add a timestamp string for now
        createdAt: new Date().toISOString(),
      },
    });
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async findById(id: number): Promise<Post | null> {
    // Prisma findUnique requires a number for Int IDs
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }
}
