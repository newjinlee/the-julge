import StoreInfoForm from '@/app/(owner)/my-store/StoreInfoForm';

export default function StoreRegisterPage() {
  return <StoreInfoForm buttonText="등록" alertMessage="등록이 완료되었습니다." method="POST" isEditPage={false} />;
}
