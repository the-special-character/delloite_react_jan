import React, { Component } from 'react';

type Props = {};

type TodoItemType = {
  id: number;
  text: string;
};

type State = {
  todoList: TodoItemType[];
  todoText: string;
};

class Todo extends Component<Props, State> {
  state = {
    todoList: [] as TodoItemType[],
    todoText: '',
  };

  addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(({ todoText, todoList }, props) => {
      return {
        todoList: [...todoList, { id: new Date().valueOf(), text: todoText }],
        todoText: '',
      };
    });
  };

  changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todoText: event.target.value });
  };

  render() {
    const { todoText, todoList } = this.state;

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
              value={todoText}
              onChange={this.changeText}
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
                <input type="checkbox" name="" id="" />
                <p key={todoItem.id} className="flex-1 px-4">
                  {todoItem.text}
                </p>
                <button className="btn">Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Todo;
