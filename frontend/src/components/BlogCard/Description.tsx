import Markdown from 'react-markdown';

function Description({ content }: { content: string }) {
  return (
    <div className="text-slate-600 leading-tight">
      <Markdown>
        {content.length > 124 ? content.slice(0, 125) + '...' : content}
      </Markdown>
    </div>
  );
}

export default Description;
