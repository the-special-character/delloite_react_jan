import React, { forwardRef, memo } from 'react';
import { TodoContext } from '../context/todoContext';

type Props = {};

const TodoForm = forwardRef<HTMLInputElement, Props>(({}: Props, ref) => {
  console.log('todoForm render');
  return (
    <TodoContext.Consumer>
      {({ addTodo, todoTextInput }) => (
        <form className="flex" onSubmit={addTodo}>
          <div>
            <label htmlFor="todo_text" className="sr-only">
              Todo Text
            </label>
            <input
              type="text"
              id="todo_text"
              placeholder="write your todo here"
              ref={todoTextInput}
            />
          </div>
          <button
            // disabled={addTodoStatus?.action === 'REQUEST'}
            type="submit"
            className="btn"
          >
            Add Todo
          </button>
        </form>
      )}
    </TodoContext.Consumer>
  );
});

export default memo(TodoForm);
