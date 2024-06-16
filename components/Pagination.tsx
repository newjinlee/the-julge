import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  noticeId: string | string[];
}

const Pagination = ({ currentPage, totalPages, hasNext, noticeId }: PaginationProps): JSX.Element => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * 5;
  };

  return (
    <div className="mt-3">
      <ul className="flex flex-row justify-center gap-[2px]">
        {currentPage > 1 && (
          <li>
            <Link href={`/my-notice/my-notice-detail/${noticeId}?page=1`} onClick={() => handlePageChange(1)}>
              aa
            </Link>
          </li>
        )}
        {pages.map(page => (
          <li key={page}>
            <Link
              href={`/my-notice/my-notice-detail/${noticeId}?page=${page}`}
              className={`w-[40px] h-[40px] flex items-center justify-center ${
                currentPage === page ? 'bg-The-julge-red-30 text-white rounded-md' : ''
              }`}
              onClick={() => handlePageChange(page)}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
