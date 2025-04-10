function BlogCardAuthor({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <div className="mr-1 capitalize">
      {firstName} {lastName}
    </div>
  );
}

export default BlogCardAuthor;
