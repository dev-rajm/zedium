import { AvatarType } from '../types';

function Avatar({ firstName, lastName, size = 30 }: AvatarType) {
  return (
    <div
      className={`bg-black text-xs flex justify-center items-center rounded-full text-white mr-2 uppercase`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {firstName[0]}
      {lastName[0]}
    </div>
  );
}

export default Avatar;
