import Avatar from './Avatar';

function Navbar() {
  return (
    <div className="flex justify-between fixed top-0 left-0 right-0 items-center h-14 border-b border-slate-200 bg-white px-5">
      <div className="flex items-center">
        <div className="text-4xl tracking-tighter font-[Playfair-Display] font-bold">
          Zedium
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            id="searchInput"
            className="outline-none w-xs ml-5 bg-slate-50 focus:bg-slate-100 text-slate-600 px-4 py-1 rounded-2xl"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 flex text-slate-500">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <p className="ml-1">Write</p>
        </div>
        <div className="ml-5">
          <Avatar size={35} firstName="R" lastName="M" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
