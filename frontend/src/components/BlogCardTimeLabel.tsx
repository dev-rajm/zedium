function BlogCardTimeLabel({ content }: { content: string }) {
  return (
    <div className="text-sm text-slate-600 mt-4 px-3 py-0.5 rounded-2xl bg-slate-200 w-fit">
      {Math.ceil(content.length / 100) + ' ' + 'minute(s) read'}
    </div>
  );
}

export default BlogCardTimeLabel;
