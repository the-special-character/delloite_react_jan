import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';
import { FilterType, TodoItemType } from '../../types/types';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

type Props = {};

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
};

class Todo extends Component<Props, State> {
  state = {
    todoList: [] as TodoItemType[],
    filterType: FilterType.all,
  };

  todoTextInput = createRef<HTMLInputElement>();

  addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoTextInput = this.todoTextInput.current;
    if (todoTextInput) {
      this.setState(
        ({ todoList }) => {
          const todoText = todoTextInput.value;
          return {
            todoList: [
              ...todoList,
              { id: new Date().valueOf(), text: todoText, isDone: false },
            ],
          };
        },
        () => {
          todoTextInput.value = '';
        },
      );
    }
  };

  toggleComplete = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === todoItem.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...todoItem, isDone: !todoItem.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === todoItem.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  setFilterType = (filterType: FilterType) => {
    this.setState({ filterType });
  };

  render() {
    console.log('render');

    const { todoList, filterType } = this.state;

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-4xl font-bold my-10">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextInput} />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter setFilterType={this.setFilterType} />
      </div>
    );
  }
}

export default Todo;
