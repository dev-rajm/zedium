import Avatar from './Avatar';

interface BlogCardType {
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  date: Date;
}

function BlogCard({ firstName, lastName, title, content, date }: BlogCardType) {
  return (
    <div className="flex justify-end mt-6">
      <div className="max-w-lg border-b border-slate-200 pb-7">
        <div className="flex items-center text-sm mb-2">
          <Avatar firstName={firstName} lastName={lastName} />
          <div className="mr-1 capitalize">
            {firstName} {lastName}
          </div>

          <div className="text-slate-500 ml-1">
            {date.toLocaleString('en-us', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
        <div className="text-2xl font-bold my-2">
          {title.length > 89 ? title.slice(0, 90) + '...' : title}
        </div>
        <div className="text-slate-600 leading-tight">
          {content.length > 126 ? content.slice(0, 127) + '...' : content}
        </div>
        <div className="text-sm text-slate-600 mt-4 px-3 rounded-2xl bg-slate-200 w-fit">
          {Math.ceil(content.length / 100) + ' ' + 'minute(s) read'}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
