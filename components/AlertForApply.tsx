import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
      <div className="w-[298px] h-[184px] p-6 flex-col justify-start items-center gap-8 inline-flex bg-white rounded-md">
        <div className="flex-col justify-start items-center gap-4 flex">
          <div className="w-6 h-6 relative">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Group 134">
                <circle id="Ellipse 15" cx="12" cy="12.5" r="12" fill="#EA3C12" />
                <path
                  id="!"
                  d="M12.6486 14.7041H11.3514L11.0676 7.83463L11 5.5H13L12.9324 7.83463L12.6486 14.7041ZM13 18.5H11.027V16.115H13V18.5Z"
                  fill="white"
                />
              </g>
            </svg>{' '}
          </div>
          <div className="w-[250px] text-center text-gray-900 text-base font-normal font-['Spoqa Han Sans Neo'] leading-relaxed">
            {message}
          </div>
        </div>
        <div
          className="w-20 px-5 py-2.5 bg-white rounded-md border border-orange-600 justify-center items-center gap-2 inline-flex"
          onClick={onClose}>
          <div className="text-center text-orange-600 text-sm font-bold font-['Spoqa Han Sans Neo']">확인</div>
        </div>
      </div>
    </div>
  );
}
