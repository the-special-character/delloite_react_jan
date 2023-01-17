import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';

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
        ({ todoList }, props) => {
          const todoText = todoTextInput.value;
          return {
            todoList: [
              ...todoList,
              { id: new Date().valueOf(), text: todoText, isDone: false },
            ],
            todoText: '',
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

        <div className="flex w-full">
          <button
            onClick={() => this.setFilterType(FilterType.all)}
            type="button"
            className="btn flex-1"
          >
            All
          </button>
          <button
            onClick={() => this.setFilterType(FilterType.pending)}
            type="button"
            className="btn flex-1"
          >
            Pending
          </button>
          <button
            onClick={() => this.setFilterType(FilterType.completed)}
            type="button"
            className="btn flex-1"
          >
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
