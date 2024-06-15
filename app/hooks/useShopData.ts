const useShopData = async (userId: string) => {
  try {
    // 가게 정보
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();

    return userData.item.shop;
  } catch (error) {
    throw error;
  }
};

export default useShopData;
