const useNoticeFullDetail = async (shopId: string, noticeId: string | string[], offset: number, limit: number) => {
  // 공고 상세 정보
  const noticeResponse = await fetch(`/api/shops/${shopId}/notices/${noticeId}`);
  const noticeDetailData = await noticeResponse.json();

  // 지원자 상세 정보
  const applicationsResponse = await fetch(
    `/api/shops/${shopId}/notices/${noticeId}/applications?offset=${offset}&limit=${limit}`,
  );
  const applicationsData = await applicationsResponse.json();

  const noticeFullDetailData = {
    item: {
      id: noticeDetailData.item.id,
      hourlyPay: noticeDetailData.item.hourlyPay,
      startsAt: noticeDetailData.item.startsAt,
      workhour: noticeDetailData.item.workhour,
      description: noticeDetailData.item.description,
      closed: noticeDetailData.item.closed,
      shop: noticeDetailData.item.shop,
      currentUserApplication: applicationsData,
    },
  };

  return noticeFullDetailData;
};

export default useNoticeFullDetail;
