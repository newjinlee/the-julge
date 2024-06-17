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

export interface Applications {
  count: number; // 전체 개수
  hasNext: boolean; // 다음 내용 존재 여부
  items: Array<{
    item: {
      createdAt: 'string';
      id: string;
      status: 'pending | accepted | rejected | canceled';
      user: {
        item: {
          address?: string; // optional
          bio?: string; // optional
          email: string;
          id: string;
          name?: string; // optional
          phone?: string; // optional
          type: 'employer' | 'employee';
        };
      };
    };
  }>;
  limit: number;
  offset: number;
}
export interface NoticeFullDetailData {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: ShopData;
    currentUserApplication: Applications;
  };
}
