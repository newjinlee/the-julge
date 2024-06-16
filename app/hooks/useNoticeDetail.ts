const useNoticeDetail = async (shopId: string, noticeId: string | string[]) => {
  try {
    // 공고 상세 정보
    const response = await fetch(`/api/shops/${shopId}/notices/${noticeId}`);
    const noticeDetailData = await response.json();

    return noticeDetailData;
  } catch (error) {
    throw error;
  }
};

export default useNoticeDetail;
