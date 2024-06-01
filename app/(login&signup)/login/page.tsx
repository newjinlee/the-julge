import Image from 'next/image';
import Link from 'next/link';
export default function Page() {
  return (
    <div className="flex h-full justify-center flex-col items-center gap-10">
      <Image src={'/logo-big.png'} height={45} width={248} alt="logo"></Image>
      <form>
        <div className="flex flex-col gap-4">
          <h1>이메일</h1>
          <input
            type="text"
            placeholder="입력"
            className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-3"></input>
          <h1>비밀번호</h1>
          <input
            type="password"
            placeholder="입력"
            className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-4"></input>
          <button className="w-[350px] h-[48px] bg-[#EA3C12] text-[16px] font-semibold rounded-md text-white">
            로그인하기
          </button>
          <div className="flex justify-center">
            <h1>회원이 아니신가요? </h1>
            <Link className="ml-3 text-blue-500 hover:underline" href="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
