import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Blogs {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  tags: { tag: string }[];
}

interface Tags {
  id: string;
  tag: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blogs>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then(res => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`).then(res => {
      setBlogs(res.data.blogs);
      setLoading(false);
    });
  }, []);

  return { loading, blogs };
};

export const useTags = () => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/tag/tags`).then(res => {
      setTags(res.data.tags);
      setLoading(false);
    });
  }, []);

  return { loading, tags };
};
