import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export const useTag = () => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/tag/tags`).then(resolve => {
      setTags(resolve.data.tags);
      setLoading(false);
    });
  }, []);

  return { loading, tags };
};
