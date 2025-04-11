import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useFetch } from '../hooks/fetch.hook';

interface GetPostType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  author: { firstName: string; lastName: string };
}

function Blogs() {
  const { loading, data: blogs }: { loading: boolean; data: GetPostType[] } =
    useFetch('blog/bulk', 'blogs');

  return (
    <>
      <Navbar />
      <div className="mt-14 grid h-screen grid-cols-1 lg:grid-cols-4">
        {loading ? (
          <div className="mt-14 lg:col-span-3">Loading...</div>
        ) : (
          <div className="px-5 flex flex-col items-center md:px-0 lg:col-span-3">
            {blogs
              .filter(blog => blog.published)
              .map(blog => (
                <BlogCard
                  key={blog.id}
                  firstName={blog.author.firstName}
                  lastName={blog.author.lastName}
                  title={blog.title}
                  content={blog.content}
                  date={new Date(blog.publishedAt)}
                />
              ))}
          </div>
        )}
        <div className="border-l border-slate-300 hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Blogs;
