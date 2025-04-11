import Avatar from './Avatar';
import BlogCardAuthor from './BlogCardAuthor';
import BlogCardDate from './BlogCardDate';
import SecondaryNavbar from './SecondaryNavbar';

interface BlogType {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: { firstName: string; lastName: string };
}

function FullBlog({ blog }: { blog: BlogType }) {
  return (
    <>
      <div className="absolute left-0 right-0 top-14 mx-auto">
        <SecondaryNavbar />
      </div>
      <div className="absolute top-32 flex justify-center w-full my-8">
        <div className="max-w-xs lg:max-w-2xl">
          <div className="text-4xl font-bold">{blog.title}</div>
          <div className="mt-6 mb-8 flex items-center">
            <Avatar
              size={36}
              firstName={blog.author.firstName}
              lastName={blog.author.lastName}
            />
            <div className="flex flex-col">
              <BlogCardAuthor
                firstName={blog.author.firstName}
                lastName={blog.author.lastName}
              />

              <div className="flex text-sm text-slate-400">
                Published at <BlogCardDate date={blog.publishedAt} />
              </div>
            </div>
          </div>
          <div className="font-mono tracking-tight leading-relaxed text-lg">
            {blog.content}
          </div>
        </div>
      </div>
    </>
  );
}

export default FullBlog;
