interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function CustomInput({ label, type = 'text', ...rest }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <label>{label}</label>
      <input {...rest} className="px-5 py-4  border border-solid border-gray-300 rounded-md" />
    </div>
  );
}
