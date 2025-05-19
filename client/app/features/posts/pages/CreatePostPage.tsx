// Page component for creating a new post.
import React from 'react';
import { CreatePostForm } from '../components/CreatePostForm'; // Import the form component
import { useCreatePost } from '../hooks/useCreatePost'; // Import the custom hook
import { Post } from '../types'; // Import feature types (client-side representation)

export const CreatePostPage: React.FC = () => {
  const { createPost, isLoading, error, createdPost } = useCreatePost();

  // Define the payload type expected by the form
  interface CreatePostFormPayload {
    title: string;
    content: string;
    authorId: string;
  }

  const handleSubmit = (postData: CreatePostFormPayload) => {
    createPost(postData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {createdPost && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          {/* Assuming post.id is a number from Prisma */}
          <span className="block sm:inline"> Post "{createdPost.title}" created with ID: {createdPost.id}</span>
        </div>
      )}
      <CreatePostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
