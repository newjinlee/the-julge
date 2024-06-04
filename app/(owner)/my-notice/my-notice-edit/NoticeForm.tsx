import React from 'react';

const NoticeForm = () => {
  return (
    <div>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col gap-2 w-[308px]">
          <p>시급*</p>
          <input type="text" className="border px-[20px] py-[16px] h-[58px] w-[100%]" />
        </div>
        <div className="flex flex-col gap-2 w-[308px]">
          <p>시작 일시*</p>
          <input type="text" className="border px-[20px] py-[16px] h-[58px] w-[100%]" />
        </div>
        <div className="flex flex-col gap-2 w-[308px]">
          <p>업무 시간*</p>
          <input type="text" className="border px-[20px] py-[16px] h-[58px] w-[100%]" />
        </div>
      </div>

      <div className="mt-5">
        <p>공고 설명</p>
        <textarea className="border w-full h-[153px] px-[20px] py-[16px]" />
      </div>

      <div className="flex justify-center mt-[32px]">
        <button className="flex justify-center font-bold border rounded-md bg-red-500 text-white w-[312px] py-[14px]">
          등록하기
        </button>
      </div>
    </div>
  );
};

export default NoticeForm;
