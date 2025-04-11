function TagLabel({ label }: { label: string }) {
  return (
    <div className="bg-slate-100 mr-1.5 mb-2 py-1.5 px-4 rounded-3xl text-sm font-light">
      {label}
    </div>
  );
}

export default TagLabel;
