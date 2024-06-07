import CustomInput from '@/components/CustomInput';
import CustomTextarea from '@/components/CustomTextarea';

const MyNoticeEdit = () => {
  const formData = [];

  return (
    <div className="relative px-[12px] py-[60px] max-w-[964px] h-full mx-auto">
      <h1 className="font-bold text-2xl mb-7">공고등록</h1>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="relative w-[308px]">
          <CustomInput label="시급*" placeholder="0" className="border px-[20px] py-[16px] h-[58px] w-[308px]" />
          <p className="absolute top-[40%] right-3">원</p>
        </div>
        <div className="w-[308px]">
          <CustomInput label="시작 일시*" className="border px-[20px] py-[16px] h-[58px] w-[308px]" />
        </div>
        <div className="relative w-[308px]">
          <CustomInput label="업무 시간*" placeholder="0" className="border px-[20px] py-[16px] h-[58px] w-[308px]" />
          <p className="absolute top-[40%] right-3">시간</p>
        </div>
      </div>
      <div>
        <CustomTextarea label="공고 설명" placeholder="공고 설명을 적어주세요." />
      </div>
      <div className="flex justify-center gap-2">
        <button className="flex justify-center w-[312px] py-[14px] bg-The-julge-gray-40 text-white">돌아가기</button>
        <button className="flex justify-center w-[312px] py-[14px] bg-The-julge-red-40 text-white">등록하기</button>
      </div>
    </div>
  );
};

export default MyNoticeEdit;
