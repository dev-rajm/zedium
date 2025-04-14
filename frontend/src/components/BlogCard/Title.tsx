import Markdown from 'react-markdown';

function Title({ title }: { title: string }) {
  return (
    <div className="text-2xl font-bold my-2">
      <Markdown>
        {title.length > 89 ? title.slice(0, 90) + '...' : title}
      </Markdown>
    </div>
  );
}

export default Title;
