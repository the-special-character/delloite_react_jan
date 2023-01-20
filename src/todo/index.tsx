import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

// Mounting
// 1. constructor
// 2.

const Todo = () => {
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
};

export default Todo;
