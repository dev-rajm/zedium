import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import toast from 'react-hot-toast';

interface Blogs {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  tags: { id: string; tag: string }[];
}

interface Tags {
  id: string;
  tag: string;
}

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  posts: {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
  }[];
}

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Users>();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setUser(res.data.user);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };

    fetcher();
  }, []);

  return { loading, user };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blogs>();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setBlog(res.data.blog);
        setLoading(false);
      } catch (e: unknown) {
        setLoading(false);
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };
    fetcher();
  }, [id]);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
        setBlogs(res.data.blogs);
        setLoading(false);
      } catch (e: unknown) {
        setLoading(false);
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };

    fetcher();
  }, []);

  return { loading, blogs };
};

export const useTags = () => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/tag/tags`);
        setTags(res.data.tags);
        setLoading(false);
      } catch (e: unknown) {
        setLoading(false);
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };
    fetcher();
  }, []);

  return { loading, tags };
};
