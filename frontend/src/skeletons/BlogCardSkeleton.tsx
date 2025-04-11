import Skeleton from 'react-loading-skeleton';

export const BlogCardSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="px-5 md:px-0 lg:col-span-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="mt-6">
            <div className="max-w-2xl leading-tight border-b border-slate-200 pb-7 mx-auto">
              <div className="flex items-center text-sm">
                <Skeleton className="bg-slate-200 mr-2 rounded-full h-8 w-8 flex" />
                <Skeleton className="bg-slate-200 mr-2 rounded-lg h-5 w-20 flex" />
                <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-5 w-20 flex" />
              </div>
              <Skeleton className="bg-slate-200 mr-2 rounded-xl h-8 w-full flex" />
              <Skeleton className="bg-slate-200 mr-2 rounded-xl h-20 w-full flex" />
              <Skeleton className="bg-slate-200 mr-2 rounded-xl h-7 w-36 flex" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
