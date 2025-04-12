function TagLabel({ label }: { label: string }) {
  return (
    <div className="bg-slate-200 mr-1.5 mb-2 py-2 px-4 rounded-3xl text-sm">
      {label}
    </div>
  );
}

export default TagLabel;
