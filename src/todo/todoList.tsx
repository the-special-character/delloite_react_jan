import React, { memo } from 'react';
import { StatusType, TodoItemType } from '../../types/types';
import TodoListItem from './todoListItem';

type Props = {
  todoList: TodoItemType[];
  updateTodoStatus: StatusType[];
  deleteTodoStatus: StatusType[];
  toggleComplete: (todoItem: TodoItemType) => void;
  deleteTodo: (todoItem: TodoItemType) => void;
};

const TodoList = ({
  todoList,
  toggleComplete,
  deleteTodo,
  updateTodoStatus,
  deleteTodoStatus,
}: Props) => {
  console.log('TodoList render');
  return (
    <>
      {todoList.map((todoItem) => {
        return (
          <TodoListItem
            key={todoItem.id}
            todoItem={todoItem}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodoStatus={updateTodoStatus.find(
              (x) => x.id === todoItem.id,
            )}
            deleteTodoStatus={deleteTodoStatus.find(
              (x) => x.id === todoItem.id,
            )}
          />
        );
      })}
    </>
  );
};

export default memo(TodoList);
