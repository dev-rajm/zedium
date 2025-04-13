import Avatar from '../Avatar';
import Title from './Title';
import Description from './Description';
import PublishedDate from './PublishedDate';
import BlogCardAuthor from './Author';
import ReadTime from './ReadTime';
import { Link } from 'react-router-dom';
import { BlogCardType } from '../../types';

function BlogCard({
  id,
  firstName,
  lastName,
  title,
  content,
  date,
}: BlogCardType) {
  return (
    <div className="mt-6">
      <div className="px-5 max-w-2xl w-screen border-b border-slate-200 pb-7">
        <div className="flex items-center text-sm mb-2">
          <Avatar firstName={firstName} lastName={lastName} size={30} />
          <BlogCardAuthor firstName={firstName} lastName={lastName} />
          {'•'}
          <PublishedDate date={date} />
        </div>
        <Link to={`/blog/${id}`}>
          <Title title={title} />
        </Link>
        <Description content={content} />
        <ReadTime content={content} />
      </div>
    </div>
  );
}

export default BlogCard;
