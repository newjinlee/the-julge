import Image from 'next/image';

type JobCardProps = {
  shopId: string;
  id: string;
  image: string;
  title: string;
  time: string;
  location: string;
  wage: string;
  alarm: boolean;
  percentage: string;
};

export function JobCard({ image, title, time, location, wage, alarm = false, percentage }: JobCardProps) {
  return (
    <div className="flex w-[312px] h-[349px] rounded-md shadow-lg flex-col p-[16px] border-solid border-2 border-gray-200 justify-between cursor-pointer">
      <Image src={image} height={160} width={280} alt="logo" />
      <div className="flex-col flex gap-[8px]">
        <h1 className="text-[20px] font-semibold">{title}</h1>
        <div className="h-[22px] flex gap-[6px] items-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_0_3739)">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 0C15.5226 0 20.0001 4.47754 20.0001 10C20.0001 15.5225 15.5226 20 10.0001 20C4.47766 20 0.00012207 15.5225 0.00012207 10C0.00012207 4.47754 4.47766 0 10.0001 0ZM8.6134 4.96745H9.83573C10.0587 4.96745 10.2426 5.15137 10.2426 5.37435V10.0846H14.5411C14.7657 10.0846 14.948 10.2686 14.948 10.4915V11.7139C14.948 11.9385 14.7641 12.1208 14.5411 12.1208H8.20487V5.37435C8.20487 5.14974 8.38879 4.96745 8.6134 4.96745ZM10.0001 2.27051C14.2693 2.27051 17.7296 5.73079 17.7296 10C17.7296 14.2692 14.2693 17.7295 10.0001 17.7295C5.73092 17.7295 2.27063 14.2692 2.27063 10C2.27063 5.73242 5.73092 2.27051 10.0001 2.27051Z" fill="#F48A71"/>
            </g>
            <defs>
              <clipPath id="clip0_0_3739">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <h1 className="text-[14px]">{time}</h1>
        </div>
        <div className="h-[22px] flex gap-[6px] items-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6424 2.3595C14.8828 1.59292 13.9955 0.99871 13.0036 0.592131C10.0186 -0.626815 6.61864 0.0713425 4.34292 2.36266C2.83335 3.88686 2.00012 5.82739 2.00012 7.83396C2.00012 9.83738 2.83283 11.78 4.34292 13.3026L5.17354 14.1324C6.84052 15.7929 8.27805 17.2266 9.51144 19.2195L9.99123 20L10.4741 19.2195C11.7075 17.2266 13.1451 15.7929 14.8092 14.1342L15.6421 13.3C18.7861 10.1305 18.7861 5.52923 15.6424 2.3595ZM12.4739 10.695C11.1035 12.0787 8.88209 12.0787 7.51138 10.695C6.1412 9.31607 6.1412 7.0766 7.51138 5.69502C8.88209 4.31607 11.1035 4.31607 12.4739 5.69502C13.8413 7.0766 13.8413 9.31554 12.4739 10.695Z" fill="#F48A71"/>
          </svg>
          <h1 className="text-[14px]">{location}</h1>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-[24px] font-semibold">{wage}</h1>
        {alarm && (
          <div className="flex justify-center items-center w-[159px] h-[36px] bg-red-400 text-[14px] px-[12px] gap-[3px] text-white rounded-3xl">
            <h1>기존 시급보다 {percentage}</h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5001 16.6668H7.50011V10.0001H3.46678L10.0001 3.4668L16.5334 10.0001H12.5001V16.6668Z" fill="white"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
