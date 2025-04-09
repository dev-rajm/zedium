interface ButtonType {
  label: string;
  loading: boolean;
  onClick: () => void;
}

function Button({ label, onClick, loading }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white font-semibold text-lg w-full py-2 rounded cursor-pointer disabled:bg-slate-400 disabled:text-black"
      disabled={loading}
    >
      {label}
    </button>
  );
}

export default Button;
