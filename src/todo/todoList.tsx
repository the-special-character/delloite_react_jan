import clsx from 'clsx';
import React from 'react';

type Props = {};

const TodoList = ({
  todoList,
  filterType,
  toggleComplete,
  deleteTodo,
}: Props) => {
  return (
    <div className="w-full flex-1">
      {todoList.map((todoItem) => {
        if (
          filterType === FilterType.all ||
          (filterType === FilterType.pending && !todoItem.isDone) ||
          (filterType === FilterType.completed && todoItem.isDone)
        ) {
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
        }
        return null;
      })}
    </div>
  );
};

export default TodoList;
