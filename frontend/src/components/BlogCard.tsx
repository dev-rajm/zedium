import Avatar from './Avatar';
import BlogCardTitle from './BlogCardTitle';
import BlogCardDescription from './BlogCardDescription';
import BlogCardDate from './BlogCardDate';
import BlogCardAuthor from './BlogCardAuthor';
import BlogCardTimeLabel from './BlogCardTimeLabel';

interface BlogCardType {
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  date: Date;
}

function BlogCard({ firstName, lastName, title, content, date }: BlogCardType) {
  return (
    <div className="mt-6">
      <div className="max-w-2xl border-b border-slate-200 pb-7">
        <div className="flex items-center text-sm mb-2">
          <Avatar firstName={firstName} lastName={lastName} size={30} />
          <BlogCardAuthor firstName={firstName} lastName={lastName} />
          {'•'}
          <BlogCardDate date={date} />
        </div>
        <BlogCardTitle title={title} />
        <BlogCardDescription content={content} />
        <BlogCardTimeLabel content={content} />
      </div>
    </div>
  );
}

export default BlogCard;
