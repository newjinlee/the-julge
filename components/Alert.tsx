import { useRouter } from 'next/navigation';

interface AlertProps {
  message: string;
  onClose: () => void;
  isEditPage?: boolean;
}

export default function Alert({ message, onClose, isEditPage = true }: AlertProps) {
  const router = useRouter();

  const handleClose = () => {
    if (isEditPage) {
      onClose();
    } else {
      router.push('/my-store');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5">
      <div className="relative w-[372px] md:w-[540px] h-60 border rounded-md bg-white flex flex-col items-center justify-center">
        <p>{message}</p>
        <button
          onClick={handleClose}
          className="absolute bottom-4 md:right-4 w-30 h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center ">
          확인
        </button>
      </div>
    </div>
  );
}
