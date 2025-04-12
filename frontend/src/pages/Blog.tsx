import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import FullBlog from '../components/FullBlog';
import Navbar from '../components/Navbar';
import FullBlogSkeleton from '../skeletons/FullBlogSkeleton';

interface BlogType {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  tags: { id: string; tag: string }[];
}

function Blog() {
  const { id } = useParams();
  const { loading, blog }: { loading: boolean; blog: BlogType | undefined } =
    useBlog({
      id: id || '',
    });

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="top-36 absolute right-0 left-0">
          <FullBlogSkeleton />
        </div>
      ) : (
        <div>{blog && <FullBlog blog={blog} />}</div>
      )}
    </>
  );
}

export default Blog;
