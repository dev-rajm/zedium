function BlogCardDescription({ content }: { content: string }) {
  return (
    <div className="text-slate-600 leading-tight">
      {content.length > 199 ? content.slice(0, 200) + '...' : content}
    </div>
  );
}

export default BlogCardDescription;
