import React, { memo } from 'react';
import { StatusType, TodoItemType } from '../../types/types';
import clsx from 'clsx';
import { LocaleContext } from '../context/localeContext';
import { TodoContext } from '../context/todoContext';

type Props = {
  todoItem: TodoItemType;
};

const TodoListItem = ({ todoItem }: Props) => {
  console.log('todo item');

  return (
    <div className="flex items-center m-4" key={todoItem.id}>
      <TodoContext.Consumer>
        {({ toggleComplete, getStatusDetails }) => {
          return (
            <input
              type="checkbox"
              checked={todoItem.isDone}
              disabled={
                !!getStatusDetails(todoItem.id, 'UPDATE_TODO', 'REQUEST')
              }
              onChange={() => toggleComplete(todoItem)}
            />
          );
        }}
      </TodoContext.Consumer>
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
      <TodoContext.Consumer>
        {({ deleteTodo, getStatusDetails }) => (
          <button
            className="btn"
            disabled={!!getStatusDetails(todoItem.id, 'DELETE_TODO', 'REQUEST')}
            onClick={() => deleteTodo(todoItem)}
          >
            Delete
          </button>
        )}
      </TodoContext.Consumer>
    </div>
  );
};

export default memo(TodoListItem);
