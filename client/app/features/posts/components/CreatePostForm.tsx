// Form component for creating a new post using shadcn/ui.
import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; // Assuming shadcn/ui input
import { Textarea } from '@/components/ui/textarea'; // Assuming shadcn/ui textarea
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button

interface CreatePostFormProps {
  onSubmit: (data: { title: string; content: string; authorId: string }) => void;
  isLoading: boolean;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(''); // Assuming a simple input for author ID for now

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, authorId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {/* Add a temporary authorId input - replace with proper user management later */}
      <div>
        <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author ID</label>
        <Input
          id="authorId"
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  );
};
