export type Job = {
  id: string;
  description: string;
  startsAt: string;
  hourlyPay: number;
  workhour: number;
  closed: boolean;
  shop: {
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
  };
  currentUserApplication: any | null;
};
