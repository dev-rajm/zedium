import { ChangeEvent } from 'react';

interface labelInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, placeholder, type, onChange }: labelInputType) {
  return (
    <div className="my-3">
      <div className="font-semibold text-lg mb-1.5">{label}</div>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
        className="border-b-2 w-full h-10 px-2 bg-slate-50 border-slate-300 focus:bg-slate-100 focus:border-black focus:outline-hidden"
        required
      />
    </div>
  );
}

export default Input;
