import clsx from 'clsx';
import React, { memo } from 'react';
import { FilterType, TodoItemType } from '../../types/types';
import TodoListItem from './todoListItem';

type Props = {
  todoList: TodoItemType[];
  filterType: FilterType;
  toggleComplete: (todoItem: TodoItemType) => void;
  deleteTodo: (todoItem: TodoItemType) => void;
};

const TodoList = ({
  todoList,
  filterType,
  toggleComplete,
  deleteTodo,
}: Props) => {
  console.log('TodoList render');
  return (
    <div className="w-full flex-1">
      {todoList.map((todoItem) => {
        if (
          filterType === FilterType.all ||
          (filterType === FilterType.pending && !todoItem.isDone) ||
          (filterType === FilterType.completed && todoItem.isDone)
        ) {
          return (
            <TodoListItem
              key={todoItem.id}
              todoItem={todoItem}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default memo(TodoList);
