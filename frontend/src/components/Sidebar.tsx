import { useState } from 'react';
import { useTags } from '../hooks';
import TagLabel from './TagLabel';
import SidebarSkeleton from '../skeletons/SidebarSkeleton';
import BlogFooter from './BlogFooter';

interface GetTagsType {
  id: string;
  tag: string;
}

function Sidebar() {
  const { loading, tags }: { loading: boolean; tags: GetTagsType[] } =
    useTags();
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
        <BlogFooter />
      </div>
    </div>
  );
}

export default Sidebar;
