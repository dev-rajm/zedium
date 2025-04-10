function BlogCardDate({ date }: { date: Date }) {
  return (
    <div className="text-slate-500 ml-1">
      {date.toLocaleString('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </div>
  );
}

export default BlogCardDate;
