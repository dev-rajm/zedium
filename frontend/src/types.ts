export type BlogsType = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  tags: { id: string; tag: string }[];
};

export type TagsType = {
  id: string;
  tag: string;
};

export type UsersType = {
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
};

export type AvatarType = {
  firstName: string;
  lastName: string;
  size?: number;
};

export type BlogCardType = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  date: string;
};

export type ButtonType = {
  label: string;
  loading: boolean;
  onClick: () => void;
};
