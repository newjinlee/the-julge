const PrevIcon = ({ width = 20, height = 20, fill = '#A4A1AA' }) => (
  <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="chevron">
      <path
        id="ic/categori (Stroke)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4628 17.4702C13.1699 17.7631 12.6951 17.7631 12.4022 17.4702L5.53036 10.5984C5.38971 10.4577 5.31069 10.2669 5.31069 10.068C5.31069 9.86911 5.38971 9.67834 5.53036 9.53769L12.4022 2.66588C12.6951 2.37299 13.1699 2.37299 13.4628 2.66588C13.7557 2.95878 13.7557 3.43365 13.4628 3.72654L7.12135 10.068L13.4628 16.4095C13.7557 16.7024 13.7557 17.1773 13.4628 17.4702Z"
        fill={fill}
      />
    </g>
  </svg>
);

const NextIcon = ({ width = 20, height = 20, fill = '#A4A1AA' }) => (
  <svg width={width} height={width} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.46967 17.4702C6.76256 17.7631 7.23744 17.7631 7.53033 17.4702L14.4021 10.5984C14.5428 10.4577 14.6218 10.2669 14.6218 10.068C14.6218 9.86911 14.5428 9.67834 14.4021 9.53769L7.53033 2.66588C7.23744 2.37299 6.76256 2.37299 6.46967 2.66588C6.17678 2.95878 6.17678 3.43365 6.46967 3.72654L12.8111 10.068L6.46967 16.4095C6.17678 16.7024 6.17678 17.1773 6.46967 17.4702Z"
      fill={fill}
    />
  </svg>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  noticeId: string | string[];
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, hasNext, noticeId, onPageChange }: PaginationProps): JSX.Element => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-3">
      <div className="flex flex-row justify-center items-center gap-[2px]">
        <button
          onClick={() => handlePrevious()}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? 'cursor-not-allowed' : ''}`}>
          <PrevIcon width={20} height={20} fill={currentPage === 1 ? '#A4A1AA' : '#111322'} />
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-[40px] h-[40px] flex items-center justify-center ${
              currentPage === page ? 'bg-The-julge-red-30 text-white rounded-md' : ''
            }`}>
            {page}
          </button>
        ))}
        <button
          onClick={() => handleNext()}
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}>
          <NextIcon width={20} height={20} fill={currentPage === totalPages ? '#A4A1AA' : '#111322'} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
