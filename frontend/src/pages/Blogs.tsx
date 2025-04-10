import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import { useBlog } from '../hooks';

interface GetPostType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  author: { firstName: string; lastName: string };
}

function Blogs() {
  const { loading, blogs }: { loading: boolean; blogs: GetPostType[] } =
    useBlog();

  return (
    <>
      <Navbar />
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2">
        {loading ? (
          <div className="mt-14">Loading...</div>
        ) : (
          <div className="px-5 flex flex-col items-end md:px-0">
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
        <div>hello</div>
      </div>
    </>
  );
}

export default Blogs;
