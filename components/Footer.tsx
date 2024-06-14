import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full bg-[#F2F2F3] h-[80px] absolute bottom-0 flex justify-center items-center text-[#7D7986]">
      <div className="w-[964px] flex justify-between">
        <h1>©codeit - 2023</h1>
        <div className="flex justify-between items-center w-[180px]">
          <h1>Privacy Policy</h1>
          <h1>F&Q</h1>
        </div>
        <div className="flex justify-between w-[95px] items-center">
          <Image src="/mail.png" alt="mail" width={20} height={20} />

          <Image src="/facebook.png" alt="facebook" width={20} height={20} />
          <Image src="/instagram.png" alt="instagram" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
