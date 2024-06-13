import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AddImage from '@/public/Group 87.svg';
import EditImage from '@/public/EditImage.png';
import createPresignedUrl from '@/app/api/(owner)/my-store/createPresignedUrl';
import uploadImageToS3 from '@/utils/uploadImageToS3';
import getImageUrlWithoutQueryParams from '@/utils/getImageUrlWithoutQueryParams';
import LoadingSpinner from '../LoadingSpinner';

interface ImageUploadProps {
  onFileChange: (imageUrl: string) => void;
  value: string | null;
  isEditPage: boolean;
}

export default function ImageUpload({ onFileChange, value, isEditPage }: ImageUploadProps) {
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
        setTimeout(() => {
          setUploading(false);
        }, 2000);
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
          {uploading && <LoadingSpinner />}
          {imageUrl ? (
            isEditPage ? (
              <div className="relative w-full h-full">
                <Image src={imageUrl} alt="Preview" layout="fill" objectFit="cover" className="z-0" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <Image src={EditImage} alt="이미지 변경하기" width={100} height={100} />
                </div>
              </div>
            ) : (
              <Image src={imageUrl} alt="Preview" layout="fill" objectFit="cover" />
            )
          ) : (
            <Image src={AddImage} alt="이미지 추가하기" layout="fill" objectFit="cover" />
          )}
        </div>
      </div>
    </div>
  );
}
