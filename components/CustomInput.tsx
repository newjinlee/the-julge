import { memo } from 'react';

interface CustomInputProps {
  label: string;
  placeholder: string;
  unit?: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({ label, placeholder, unit, name, value, onChange }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-2 mb-8 relative">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-5 py-4 bg-white border border-solid border-gray-300 rounded-md"
      />
      {unit && <span className="absolute top-4 right-1 h-full flex items-center px-4 pointer-events-none">{unit}</span>}
    </div>
  );
}

export default memo(CustomInput);
