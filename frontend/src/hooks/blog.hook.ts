import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`).then(resolve => {
      setBlogs(resolve.data.blogs);
      setLoading(false);
    });
  }, []);

  return { loading, blogs };
};
