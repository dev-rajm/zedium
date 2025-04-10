function BlogCardTitle({ title }: { title: string }) {
  return (
    <div className="text-2xl font-bold my-2">
      {title.length > 89 ? title.slice(0, 90) + '...' : title}
    </div>
  );
}

export default BlogCardTitle;
