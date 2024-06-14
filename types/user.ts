import { ShopData } from './shops';

export interface UserData {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: ShopData | null;
}

export interface ApiResponse {
  itme: UserData;
  links: Array<any>;
}
