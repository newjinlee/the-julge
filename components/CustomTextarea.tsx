interface CustomTextareaProps {
  label: string;
  placeholder: string;
}

export default function CustomTextarea({ label, placeholder }: CustomTextareaProps) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <label>{label}</label>
      <textarea
        className="px-5 py-4  border border-solid border-gray-300 rounded-md"
        placeholder={placeholder}></textarea>
    </div>
  );
}
