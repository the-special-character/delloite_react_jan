import React, { forwardRef } from 'react';

type Props = {
  addTodo: (event: React.FormEvent<HTMLFormElement>) => void;
};

const TodoForm = forwardRef<HTMLInputElement, Props>(
  ({ addTodo }: Props, ref) => {
    return (
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
        <button type="submit" className="btn">
          Add Todo
        </button>
      </form>
    );
  },
);

export default TodoForm;
