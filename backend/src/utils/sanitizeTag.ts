export const sanitizeTag = (tags: string | null) => {
  return tags?.split(',').map(tag => tag.trim());
};
