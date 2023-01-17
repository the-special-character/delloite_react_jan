import React, { memo } from 'react';
import { TodoItemType } from '../../types/types';
import clsx from 'clsx';

type Props = {
  todoItem: TodoItemType;
  toggleComplete: (todoItem: TodoItemType) => void;
  deleteTodo: (todoItem: TodoItemType) => void;
};

const TodoListItem = ({ todoItem, toggleComplete, deleteTodo }: Props) => {
  console.log('todo list item');
  return (
    <div className="flex items-center m-4" key={todoItem.id}>
      <input
        type="checkbox"
        checked={todoItem.isDone}
        onChange={() => toggleComplete(todoItem)}
      />
      <p
        key={todoItem.id}
        className={clsx('flex-1 px-4', {
          'line-through': todoItem.isDone,
        })}
        // style={{
        //   textDecoration: todoItem.isDone ? 'line-through' : 'none',
        // }}
      >
        {todoItem.text}
      </p>
      <button className="btn" onClick={() => deleteTodo(todoItem)}>
        Delete
      </button>
    </div>
  );
};

export default memo(TodoListItem);
