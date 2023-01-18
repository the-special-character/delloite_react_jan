import React, { memo } from 'react';
import { FilterType } from '../../types/types';
import { TodoContext } from '../context/todoContext';

type Props = {};

const TodoFilter = ({}: Props) => {
  return (
    <TodoContext.Consumer>
      {({ loadTodo }) => (
        <div className="flex w-full">
          <button
            onClick={() => loadTodo(FilterType.all)}
            type="button"
            className="btn flex-1"
          >
            All
          </button>
          <button
            onClick={() => loadTodo(FilterType.pending)}
            type="button"
            className="btn flex-1"
          >
            Pending
          </button>
          <button
            onClick={() => loadTodo(FilterType.completed)}
            type="button"
            className="btn flex-1"
          >
            Completed
          </button>
        </div>
      )}
    </TodoContext.Consumer>
  );
};

export default memo(TodoFilter);
