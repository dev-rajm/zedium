import { AvatarType } from '../types';

function BlogCardAuthor({ firstName, lastName }: AvatarType) {
  return (
    <div className="mr-1 capitalize">
      {firstName} {lastName}
    </div>
  );
}

export default BlogCardAuthor;
