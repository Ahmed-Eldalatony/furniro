// Repository for handling Post data access (simulated in-memory).

import { CreatePostDto } from "@/dtos";
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export class PostRepository {
  private posts: Post[] = [];
  private nextId = 1;

  async create(postData: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      id: (this.nextId++).toString(),
      ...postData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    // Return a copy to prevent external modification
    return [...this.posts];
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.posts.find(post => post.id === id);
  }
}
