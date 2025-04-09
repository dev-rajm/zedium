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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-10 md:px-0">
          {blogs.map(blog => {
            if (blog.published) {
              return (
                <BlogCard
                  firstName={blog.author.firstName}
                  lastName={blog.author.lastName}
                  title={blog.title}
                  content={blog.content}
                  date={new Date(blog.publishedAt)}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Blogs;
