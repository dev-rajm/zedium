import Avatar from './Avatar';
import BlogCardDate from './BlogCardDate';

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

function UserProfile({ user }: { user: Users }) {
  return (
    <div className="h-full border-l border-l-slate-300 pl-5 lg:pl-10">
      <div className="sticky top-20">
        <div className="flex flex-col">
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            size={53}
          />
          <div className="mt-2 text-slate-400">@{user.username}</div>
          <div className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm flex items-center font-medium mt-1">
            <div className="">
              Total Posts:{' '}
              <span className="text-slate-500">{user.posts.length}</span>
            </div>
            <div className="flex ml-2">
              Joining: <BlogCardDate date={user.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
