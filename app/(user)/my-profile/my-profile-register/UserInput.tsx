interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
}

export default function UserInput({ label, unit, type = 'text', ...rest }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-2 mb-8 relative">
      <label>{label}</label>
      <input {...rest} className="px-5 py-4 bg-white border border-solid border-gray-300 rounded-md" />
      {unit && <span className="absolute top-4 right-1 h-full flex items-center px-4 pointer-events-none">{unit}</span>}
    </div>
  );
}
