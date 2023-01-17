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
