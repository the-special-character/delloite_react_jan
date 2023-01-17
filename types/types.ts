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
  type: string;
  action: 'REQUEST' | 'FAIL';
  error?: Error;
};
