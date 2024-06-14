export interface ShopData {
  item: {
    id: string; // shop_id
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  href: string;
}
