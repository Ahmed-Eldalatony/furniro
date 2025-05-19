// Provider for injecting service instances using React Context.
import React, { createContext, useContext, useMemo } from 'react';
import { PostRepository, IPostRepository } from '@/features/posts/repositories'; // Import concrete repository and interface
import { PostService, IPostService } from '@/features/posts/services'; // Import service interface and concrete class

interface IServicesContext {
  postService: IPostService;
  // Add other service interfaces here
}

const ServiceContext = createContext<IServicesContext | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Instantiate repositories and services here
  // Use useMemo to ensure instances are stable across renders
  const postRepository: IPostRepository = useMemo(() => new PostRepository(), []);
  const postService: IPostService = useMemo(() => new PostService(postRepository), [postRepository]);

  const services: IServicesContext = useMemo(() => ({
    postService,
    // Initialize other services
  }), [postService]);

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
