import StoreInfoForm from '@/app/(owner)/my-store/StoreInfoForm';

export default function StoreEditPage() {
  return <StoreInfoForm buttonText="완료하기" alertMessage="수정이 완료되었습니다." method="PUT" />;
}
