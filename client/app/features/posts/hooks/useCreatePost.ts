// Custom hook for handling the create post form logic.
import { useState } from 'react';
import { useServices } from '@/providers/ServiceProvider'; // Import the service hook
import { CreatePostPayload, Post } from '../types'; // Import feature types

export const useCreatePost = () => {
  const { postService } = useServices(); // Get the post service from context
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPost, setCreatedPost] = useState<Post | null>(null);

  const createPost = async (postData: CreatePostPayload) => {
    setIsLoading(true);
    setError(null);
    setCreatedPost(null);
    try {
      const newPost = await postService.createPost(postData);
      setCreatedPost(newPost);
      // Optionally reset form fields here
      // setTitle('');
      // setContent('');
      // setAuthorId('');
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      console.error('Create post error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
    createdPost,
  };
};
