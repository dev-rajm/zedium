import { useState } from 'react';
import { useFetch } from '../hooks/fetch.hook';
import TagLabel from './TagLabel';
import SidebarSkeleton from '../skeletons/SidebarSkeleton';

interface GetTagsType {
  id: string;
  tag: string;
}

function Sidebar() {
  const { loading, data: tags }: { loading: boolean; data: GetTagsType[] } =
    useFetch('tag/tags', 'tags');
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="px-8 sticky top-20">
      <div className="text-lg font-semibold mb-3">Recommended topics</div>
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <div>
          <div className="flex flex-wrap">
            {(showAll ? tags : tags.slice(0, 7)).map(tag => (
              <TagLabel key={tag.id} label={tag.tag} />
            ))}
          </div>
          {tags.length > 7 && (
            <button
              className="text-sm text-slate-400 mt-3 hover:underline cursor-pointer"
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll ? 'Show less topics' : 'Show more topics'}
            </button>
          )}
        </div>
      )}

      <div className="text-slate-400 text-xs mt-5">
        <ul className="flex flex-wrap leading-loose">
          <li className="mr-2.5 hover:underline cursor-pointer">Help</li>
          <li className="mr-2.5 hover:underline cursor-pointer">About</li>
          <li className="mr-2.5 hover:underline cursor-pointer">Privacy</li>
          <li className="mr-2.5 hover:underline cursor-pointer">Terms</li>
          <li className="mr-2.5 hover:underline cursor-pointer">Rules</li>
          <li className="mr-2.5 hover:underline cursor-pointer">
            Contribution
          </li>
          <li className="mr-2.5 hover:underline cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
