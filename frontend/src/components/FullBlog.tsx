import Avatar from './Avatar';
import BlogCardAuthor from './BlogCardAuthor';
import BlogCardDate from './BlogCardDate';
import BlogFooter from './BlogFooter';
import SecondaryNavbar from './SecondaryNavbar';
import TagLabel from './TagLabel';

interface BlogType {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  tags: { id: string; tag: string }[];
}

function FullBlog({ blog }: { blog: BlogType }) {
  return (
    <div className="z-10">
      <div className="absolute left-0 right-0 top-14 mx-auto">
        <SecondaryNavbar />
      </div>
      <div className="absolute top-32 flex flex-col items-center justify-center w-full my-8">
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
          <div className="font-serif tracking-normal leading-relaxed text-xl">
            {blog.content}
          </div>
          <div className="flex flex-wrap my-8">
            {blog.tags?.map(tag => (
              <TagLabel key={tag.id} label={tag.tag} />
            ))}
          </div>
        </div>
        <div className="text-sm border-t border-t-slate-300 text-slate-400 h-16 w-full justify-center items-center flex">
          <BlogFooter />
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
