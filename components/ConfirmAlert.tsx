import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AlertProps {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmAlert({ message, onClose, onConfirm }: AlertProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5">
      <div className="relative w-[350px] h-auto py-[24px] border rounded-md bg-white flex flex-col items-center justify-center">
        <Image src="/popup-check-icon.png" alt="팝업체크아이콘" width={24} height={24} />
        <p className="mt-[16px]">{message}</p>
        <div className="flex flex-row gap-2 mt-[32px]">
          <button
            onClick={handleClose}
            className="w-30 h-12 bg-white text-The-julge-primary border border-The-julge-primary font-bold rounded-md px-12 py-3 text-center ">
            아니오
          </button>
          <button
            onClick={handleConfirm}
            className="w-30 h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center ">
            예
          </button>
        </div>
      </div>
    </div>
  );
}
