import Skeleton from 'react-loading-skeleton';

function FullBlogSkeleton() {
  return (
    <div className="w-full px-5 leading-2">
      <Skeleton className="bg-slate-200 mr-2 rounded-xl h-9 w-full flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-xl h-9 w-full flex" />
      <div className="mt-6 mb-8 flex items-center">
        <Skeleton className="bg-slate-200 mr-2 rounded-full h-10 w-10 flex" />
        <div className="flex flex-col">
          <Skeleton className="bg-slate-200 mr-2 rounded-lg h-5 w-28 flex" />

          <div className="flex text-sm text-slate-400">
            <Skeleton className="bg-slate-200 mr-2 rounded-xl h-5 w-28 flex" />
          </div>
        </div>
      </div>
      <div className="font-serif tracking-normal leading-2 text-xl">
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
        <Skeleton className="bg-slate-200 rounded-xl h-8 w-full flex" />
      </div>
    </div>
  );
}

export default FullBlogSkeleton;
