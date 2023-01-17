import React, { forwardRef, memo } from 'react';
import { StatusType } from '../../types/types';

type Props = {
  addTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  addTodoStatus?: StatusType;
};

const TodoForm = forwardRef<HTMLInputElement, Props>(
  ({ addTodo, addTodoStatus }: Props, ref) => {
    console.log('todoForm render');
    return (
      <>
        <form className="flex" onSubmit={addTodo}>
          <div>
            <label htmlFor="todo_text" className="sr-only">
              Todo Text
            </label>
            <input
              type="text"
              id="todo_text"
              placeholder="write your todo here"
              ref={ref}
            />
          </div>
          <button
            disabled={addTodoStatus?.action === 'REQUEST'}
            type="submit"
            className="btn"
          >
            Add Todo
          </button>
        </form>
        {addTodoStatus?.action === 'FAIL' && (
          <p className="text-red-500 text-center text-xl">
            {addTodoStatus.error?.message}
          </p>
        )}
      </>
    );
  },
);

export default memo(TodoForm);
