interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[540px] h-60 border rounded-md bg-white flex flex-col items-center justify-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="absolute bottom-4 right-4 w-30 h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center ">
          확인
        </button>
      </div>
    </div>
  );
}
