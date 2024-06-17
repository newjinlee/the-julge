const useNoticeDetail = async (shopId: string, noticeId: string | string[]) => {
  // 공고 상세 정보
  const response = await fetch(`/api/shops/${shopId}/notices/${noticeId}`);
  const noticeDetailData = await response.json();

  return noticeDetailData;
};

export default useNoticeDetail;
