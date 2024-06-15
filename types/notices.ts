import { ShopData } from '.';

export interface NoticeData {
  item: {
    id?: string;
    hourlyPay: number;
    startsAt: string | null;
    workhour: number;
    description: string;
    closed?: boolean;
  };
}

// 특정 공고 조회
export interface NoticeDetailData {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: ShopData;
    currentUserApplication: {
      item: {
        id: string;
        status: 'pending | accepted | rejected | canceled';
        createdAt: string;
      };
    };
  };
  links: any;
}
