import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import { useProfile } from '../hooks';
import BlogCard from '../components/BlogCard';

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  email: string;
  posts: {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
  }[];
}

function Profile() {
  const { loading, user }: { loading: boolean; user: Users | undefined } =
    useProfile();
  return (
    <>
      <Navbar />
      <Toaster />
      <div className="top-14 absolute left-0 right-0 grid h-screen grid-cols-1 lg:grid-cols-4">
        <div className="px-5 flex flex-col items-center md:px-0 lg:col-span-3 order-2 lg:order-1">
          <div className="my-5 lg:my-8 self-start text-4xl font-semibold">
            {user?.firstName} {user?.lastName}
          </div>
          {user?.posts?.map(blog => (
            <BlogCard
              key={blog.id}
              blogId={blog.id}
              firstName={user.firstName}
              lastName={user.lastName}
              title={blog.title}
              content={blog.content}
              date={blog.publishedAt}
            />
          ))}
        </div>
        <div className="order-1 border-l border-l-slate-300 lg:order-2">
          <div className="sticky top-20 mt-10 lg:mt-0 px-5 lg:px-10">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>{user && <UserProfile user={user} />}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
