interface CustomInputProps {
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'textarea';
  placeholder?: string;
}

export default function CustomInput({ label, type = 'text', placeholder }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea className="px-5 py-4" placeholder={placeholder}></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="px-5 py-4  border border-solid border-gray-300 rounded-md"
        />
      )}
    </div>
  );
}
