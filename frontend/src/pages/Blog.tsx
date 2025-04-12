import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import FullBlog from '../components/FullBlog';
import Navbar from '../components/Navbar';
import FullBlogSkeleton from '../skeletons/FullBlogSkeleton';
import { Toaster } from 'react-hot-toast';
import { BlogsType } from '../types';

function Blog() {
  const { id } = useParams();
  const { loading, blog }: { loading: boolean; blog: BlogsType } = useBlog({
    id: id || '',
  });

  return (
    <>
      <Navbar />
      <Toaster />
      {loading ? (
        <div className="absolute top-36 left-0 right-0 flex justify-center">
          <FullBlogSkeleton />
        </div>
      ) : (
        <div>{blog && <FullBlog blog={blog} />}</div>
      )}
    </>
  );
}

export default Blog;
