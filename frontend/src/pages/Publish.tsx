import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Markdown from 'react-markdown';

function Publish() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  function handleInput() {
    const textarea = textareaRef.current as HTMLTextAreaElement | null;
    if (textarea !== null) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  useEffect(() => {
    if (!preview) {
      handleInput();
    }
  }, [preview]);
  return (
    <>
      <Navbar />
      <div className="absolute top-20 left-0 right-0">
        <div className="mx-auto max-w-sm lg:max-w-1/2">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setPreview(prev => !prev)}
              className="text-slate-400 hover:underline hover:cursor-pointer ml-3"
              hidden={content ? false : true}
            >
              {preview ? 'Raw' : 'Preview'}
            </button>
            <button className="bg-red-600 py-1 px-3 rounded-2xl text-sm font-medium text-white ml-3">
              Draft
            </button>
            <button className="bg-green-600 py-1 px-3 rounded-2xl text-sm font-medium text-white ml-3">
              Publish
            </button>
          </div>
          {preview ? (
            <div className="wrap-anywhere">
              <Markdown>{content ? content : 'Nothing to show!'}</Markdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              onChange={e => setContent(e.target.value)}
              value={content}
              placeholder="Start writing your masterpiece as markdown..."
              className="w-full outline-none text-xl font-serif leading-relaxed overflow-y-hidden resize-none"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Publish;
