import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AddImage from '@/public/Group 87.svg';
import axiosInstance from '@/app/api/lib/axios';
import createPresignedUrl from '@/app/api/(owner)/my-store/createPresignedUrl';
import uploadImageToS3 from '@/utils/uploadImageToS3';
import getImageUrlWithoutQueryParams from '@/utils/getImageUrlWithoutQueryParams';

interface ImageUploadProps {
  onFileChange: (imageUrl: string) => void;
  value: string | null;
}

export default function ImageUpload({ onFileChange, value }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(value);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const presignedUrl = await createPresignedUrl(file.name); // Presigned URL 생성
        await uploadImageToS3(presignedUrl, file); // S3로 이미지 업로드

        const imageUrlWithoutQueryParams = getImageUrlWithoutQueryParams(presignedUrl); // 쿼리 파라미터 제거한 URL
        setImageUrl(imageUrlWithoutQueryParams); // 이미지 URL 설정
        onFileChange(imageUrlWithoutQueryParams); // 이미지 파일을 부모 컴포넌트로 전달
      } catch (error) {
        console.error('File upload error:', error);
      } finally {
        setUploading(false);
      }
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
        <div
          onClick={handleImageClick}
          className="cursor-pointer relative w-[455px] h-[276px] rounded-md overflow-hidden">
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
