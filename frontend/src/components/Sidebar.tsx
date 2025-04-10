import { useTag } from '../hooks/tag.hook';
import TagLabel from './TagLabel';

interface GetTagsType {
  id: string;
  tag: string;
}

function Sidebar() {
  const { loading, tags }: { loading: boolean; tags: GetTagsType[] } = useTag();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 mt-6">
      <div className="text-lg font-semibold mb-2.5">Recommended topics</div>
      <div className="flex flex-wrap">
        {tags.map(tag => (
          <TagLabel key={tag.id} label={tag.tag} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
