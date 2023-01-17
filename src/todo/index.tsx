import React, { Component, createRef } from 'react';
import clsx from 'clsx';

type Props = {};

type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

type State = {
  todoList: TodoItemType[];
};

class Todo extends Component<Props, State> {
  state = {
    todoList: [] as TodoItemType[],
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

  render() {
    console.log('render');

    const { todoList } = this.state;

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold my-10">Todo App</h1>
        <form className="flex" onSubmit={this.addTodo}>
          <div>
            <label htmlFor="todo_text" className="sr-only">
              Todo Text
            </label>
            <input
              type="text"
              id="todo_text"
              placeholder="write your todo here"
              ref={this.todoTextInput}
            />
          </div>
          <button type="submit" className="btn">
            Add Todo
          </button>
        </form>
        <div className="w-full">
          {todoList.map((todoItem) => {
            return (
              <div className="flex items-center m-4" key={todoItem.id}>
                <input
                  type="checkbox"
                  checked={todoItem.isDone}
                  onChange={() => this.toggleComplete(todoItem)}
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
                <button
                  className="btn"
                  onClick={() => this.deleteTodo(todoItem)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Todo;
