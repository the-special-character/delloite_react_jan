import React, { memo } from 'react';
import TodoListItem from './todoListItem';
import { TodoContext } from '../context/todoContext';

type Props = {};

const TodoList = ({}: Props) => {
  return (
    <TodoContext.Consumer>
      {({ todoList }) => (
        <>
          {todoList.map((todoItem) => {
            return <TodoListItem key={todoItem.id} todoItem={todoItem} />;
          })}
        </>
      )}
    </TodoContext.Consumer>
  );
};

export default memo(TodoList);
