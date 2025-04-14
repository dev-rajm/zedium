import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useFetch = <T>(url: string, initialState: T, withAuth = true) => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const headers = withAuth
          ? { Authorization: localStorage.getItem('token') }
          : {};
        const res = await axios.get(url, { headers });
        setData(res.data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) fetcher();
  }, [url, withAuth]);

  return { data, loading };
};
