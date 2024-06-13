const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full z-50 ">
    <svg
      className="animate-spin h-10 w-10 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V1.5A.5.5 0 0011.5 1H12a.5.5 0 00-.5.5V4a8 8 0 01-8 8z"></path>
    </svg>
  </div>
);

export default LoadingSpinner;
