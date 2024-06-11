interface CustomTextareaProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CustomTextarea({ label, placeholder, name, value, onChange }: CustomTextareaProps) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="px-5 py-4  border border-solid border-gray-300 rounded-md"
        placeholder={placeholder}></textarea>
    </div>
  );
}
