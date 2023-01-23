export type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

export enum FilterType {
  all = 'all',
  pending = 'pending',
  completed = 'completed',
}

export type StatusType = {
  id: number;
  actionName: string;
  actionType: 'REQUEST' | 'FAIL';
  error?: Error;
};

export type UserType = {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartType = {
  id?: number;
  productId: number;
  quantity: number;
};
