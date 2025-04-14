import Markdown from 'react-markdown';
import { BlogsType } from '../types';
import Avatar from './Avatar';
import BlogCardAuthor from './BlogCard/Author';
import BlogCardDate from './BlogCard/PublishedDate';
import BlogFooter from './Footer';
import SecondaryNavbar from './SecondaryNavbar';
import TagLabel from './TagLabel';

function FullBlog({ blog }: { blog: BlogsType }) {
  return (
    <div className="z-10">
      <div className="absolute left-0 right-0 top-14 mx-auto">
        <SecondaryNavbar />
      </div>
      <div className="absolute top-32 flex flex-col items-center justify-center w-full my-8">
        <div className="max-w-xs lg:max-w-2xl">
          <div className="text-4xl font-bold">
            <Markdown>{blog.title}</Markdown>
          </div>
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
          <div className="font-serif tracking-wide leading-relaxed text-xl">
            <Markdown>{blog.content}</Markdown>
          </div>
          <div className="flex flex-wrap my-8">
            {blog.tags?.map(tag => (
              <TagLabel key={tag.id} label={tag.tag} />
            ))}
          </div>
        </div>

        <div className="px-5 lg:px-0 text-sm border-t border-t-slate-300 text-slate-400 h-16 w-full justify-center items-center flex">
          <BlogFooter />
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
