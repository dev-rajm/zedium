interface AvatarType {
  firstName: string;
  lastName: string;
  size?: number;
}

function Avatar({ firstName, lastName, size = 7 }: AvatarType) {
  return (
    <div
      className={`bg-black text-xs size-${size} flex justify-center items-center rounded-full text-white mr-2 uppercase`}
    >
      {firstName[0]}
      {lastName[0]}
    </div>
  );
}

export default Avatar;
