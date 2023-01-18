import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';
import { FilterType, StatusType, TodoItemType } from '../../types/types';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

type Props = {};

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
  status: StatusType[];
};

// Mounting
// 1. constructor
// 2.

class Todo extends Component<Props, State> {
  render() {
    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-4xl font-bold my-10">Todo App</h1>
        <TodoForm />
        <div className="w-full flex-1">
          <TodoList />
        </div>
        <TodoFilter />
      </div>
    );
  }
}

export default Todo;
