import { BACKEND_URL } from '../config';
import { BlogsType, TagsType, UsersType } from '../types';
import { useFetch } from './useFetch';

export const useProfile = () => {
  const { loading, data } = useFetch<{ user: UsersType }>(
    `${BACKEND_URL}/api/v1/user/profile`,
    undefined as unknown as { user: UsersType }
  );
  return { user: data?.user, loading };
};

export const useBlog = ({ id }: { id: string }) => {
  const { loading, data } = useFetch<{ blog: BlogsType }>(
    `${BACKEND_URL}/api/v1/blog/${id}`,
    undefined as unknown as { blog: BlogsType }
  );

  return { blog: data?.blog, loading };
};

export const useBlogs = () => {
  const { loading, data } = useFetch<{ blogs: BlogsType[] }>(
    `${BACKEND_URL}/api/v1/blog/bulk`,
    { blogs: [] },
    false
  );
  return { blogs: data?.blogs, loading };
};

export const useTags = () => {
  const { loading, data } = useFetch<{ tags: TagsType[] }>(
    `${BACKEND_URL}/api/v1/tag/tags`,
    { tags: [] },
    false
  );
  return { tags: data?.tags, loading };
};
