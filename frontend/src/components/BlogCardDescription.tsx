function BlogCardDescription({ content }: { content: string }) {
  return (
    <div className="text-slate-600 leading-tight">
      {content.length > 126 ? content.slice(0, 127) + '...' : content}
    </div>
  );
}

export default BlogCardDescription;
