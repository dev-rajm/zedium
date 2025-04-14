import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Markdown from 'react-markdown';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Publish() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  async function save(arg: boolean) {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title: title, content: content, published: arg },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      toast.success(arg ? 'Published' : 'Saved as draft');
      navigate(`/blog/${res.data.id}`);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }

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
      <Toaster />
      <div className="absolute top-20 left-0 right-0">
        <div className="mx-auto px-5 lg:px-0 max-w-sm lg:max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <div className="hover: cursor-help">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            <div>
              <button
                onClick={() => setPreview(prev => !prev)}
                className="text-slate-400 hover:underline hover:cursor-pointer ml-3"
                hidden={content && title ? false : true}
              >
                {preview ? 'Raw' : 'Preview'}
              </button>
              <button
                onClick={() => save(false)}
                className="bg-red-600 py-2 px-3 rounded-3xl cursor-pointer hover:bg-red-700 text-sm font-medium text-white ml-3 disabled:bg-red-300 disabled:cursor-not-allowed"
                disabled={title && content ? false : true}
              >
                Draft
              </button>
              <button
                onClick={() => save(true)}
                className="bg-green-600 py-2 px-3 rounded-3xl cursor-pointer hover:bg-green-700 text-sm font-medium text-white ml-3 disabled:bg-green-300 disabled:cursor-not-allowed"
                disabled={title && content ? false : true}
              >
                Publish
              </button>
            </div>
          </div>
          {preview ? (
            <div className="wrap-anywhere">
              <Markdown>{title ? title : 'No title found!'}</Markdown>
              <Markdown>{content ? content : 'No content found!'}</Markdown>
            </div>
          ) : (
            <>
              <input
                className="w-full min-h-20 wrap-break-word mb-3 text-5xl h-auto outline-none font-serif"
                onChange={e => setTitle(e.target.value)}
                value={title}
                placeholder="# Your story title..."
                type="text"
              />
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                onChange={e => setContent(e.target.value)}
                value={content}
                placeholder="## Start writing your masterpiece as markdown..."
                className="w-full outline-none text-xl font-serif leading-relaxed overflow-y-hidden resize-none"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Publish;
