import { useState, useEffect, useCallback } from 'react';
import { postService, PostQuery } from '../services/postService';
import { Post, PostsResponse } from '../types';

export const usePosts = (initialQuery: PostQuery = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [query, setQuery] = useState<PostQuery>(initialQuery);

  const fetchPosts = useCallback(async (newQuery?: PostQuery) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryToUse = newQuery || query;
      const response = await postService.getPosts(queryToUse);
      setPosts(response.posts);
      setPagination(response.pagination);
      if (newQuery) {
        setQuery(newQuery);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const refreshPosts = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    pagination,
    query,
    fetchPosts,
    refreshPosts,
    setQuery,
  };
};

export const usePost = (id: number | null) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await postService.getPostById(id);
        setPost(response.post);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const refreshPost = () => {
    if (id) {
      // Refetch logic would go here
    }
  };

  return {
    post,
    loading,
    error,
    refreshPost,
  };
};