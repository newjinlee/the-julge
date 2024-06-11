import { JobCard } from '@/components/JobCard';
import { PostCard } from '@/app/(user)/notice-list/PostCard';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-start w-100% px-[238px] py-[60px] bg-[var(--The-julge-red-10,#FFEBE7)] gap-[32px]">
        <h1 className=" text-[28px] font-bold leading-normal tracking-[0.56px] text-[var(--The-julge-black,#111322)]">
          맞춤 공고
        </h1>
        <div className="grid grid-cols-3 gap-[14px] justify-start">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      <div className="flex flex-col items-start w-[1440px] px-[238px] py-[60px] gap-[40px]">
        <h1 className="text-[var(--The-julge-black,#111322)] font-['Spoqa Han Sans Neo'] text-[28px] font-bold leading-normal tracking-[0.56px]">
          전체 공고
        </h1>
        <div className="grid grid-cols-3 gap-[14px] justify-start">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div className="flex w-[1440px] px-[12px] justify-between items-center bg-[var(--The-julge-white,#FFF)]">
          <div className="flex items-center gap-[20px]">1 2 3 4</div>
        </div>
      </div>
    </>
  );
}
