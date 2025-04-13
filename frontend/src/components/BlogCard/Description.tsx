function Description({ content }: { content: string }) {
  return (
    <div className="text-slate-600 leading-tight">
      {content.length > 124 ? content.slice(0, 125) + '...' : content}
    </div>
  );
}

export default Description;
