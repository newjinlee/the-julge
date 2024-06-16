interface StatusBarProps {
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
}

const StatusBar: React.FC<StatusBarProps> = ({ status }) => {
  let statusText = '';
  let statusColor = '';
  let textColor = '';

  switch (status) {
    case 'pending':
      statusText = '대기 중';
      statusColor = 'bg-[#D4F7D4]';
      textColor = 'text-[#20A81E]';
      break;
    case 'accepted':
      statusText = '승인';
      statusColor = 'bg-[#CCE6FF]';
      textColor = 'text-[#0080FF]';
      break;
    case 'rejected':
      statusText = '거절';
      statusColor = 'bg-[#FFEBE7]';
      textColor = 'text-[#FF4040]';
      break;
    // case 'canceled':
    //   statusText = '취소';
    //   statusColor = 'bg-gray-500';
    //   break;
    // default:
    //   statusText = '알 수 없음';
    //   statusColor = 'bg-gray-300';
  }

  return (
    <div
      className={`w-[80px] h-8 flex items-center justify-center rounded-2xl text-[14px] font-semibold ${statusColor} ${textColor}`}>
      <span>{statusText}</span>
    </div>
  );
};

export default StatusBar;
