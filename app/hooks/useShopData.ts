const useShopData = async (userId: string) => {
  // 가게 정보
  const response = await fetch(`/api/users/${userId}`);
  const userData = await response.json();

  return userData.item.shop;
};

export default useShopData;
