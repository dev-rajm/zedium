function BlogCardDate({ date }: { date: string }) {
  return (
    <div className="text-slate-500 ml-1">
      {new Date(date).toLocaleString('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </div>
  );
}

export default BlogCardDate;
