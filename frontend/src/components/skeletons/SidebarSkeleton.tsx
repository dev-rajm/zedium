import Skeleton from 'react-loading-skeleton';

function SidebarSkeleton() {
  return (
    <div className="flex flex-wrap leading-2">
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-20 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-20 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-30 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-20 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-20 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-30 flex" />
      <Skeleton className="bg-slate-200 mr-2 rounded-3xl h-9 w-30 flex" />
    </div>
  );
}

export default SidebarSkeleton;
