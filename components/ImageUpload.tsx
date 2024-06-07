import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import AddImage from '@/public/Group 87.svg';

interface ImageUploadProps {
  onFileChange: (file: File) => void;
}

export default function ImageUpload({ onFileChange }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-8">
      <label htmlFor="file-upload" className="block">
        가게 이미지
      </label>
      <div className="mt-1 flex items-center">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <div onClick={handleImageClick} className="cursor-pointer relative w-[455px] h-[276px]">
          {imageUrl ? (
            <Image src={imageUrl} alt="Preview" layout="fill" objectFit="cover" />
          ) : (
            <Image src={AddImage} alt="이미지 추가하기" layout="fill" objectFit="cover" />
          )}
        </div>
      </div>
    </div>
  );
}
