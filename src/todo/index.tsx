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

// Mounting
// 1. constructor
// 2.

class Todo extends Component<Props, State> {
  // based on props if you want to define state value
  // to bnd a method
  // analytics
  constructor(props: Props) {
    super(props);
    this.state = {
      todoList: [] as TodoItemType[],
      filterType: FilterType.all,
    };
    // server call
  }

  todoTextInput = createRef<HTMLInputElement>();

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3000/todoList');
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  }

  addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const todoTextInput = this.todoTextInput.current;
      if (todoTextInput) {
        const todoText = todoTextInput.value;
        const res = await fetch('http://localhost:3000/todoList', {
          method: 'POST',
          body: JSON.stringify({ text: todoText, isDone: false }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const json = await res.json();

        this.setState(
          ({ todoList }) => {
            return {
              todoList: [...todoList, json],
            };
          },
          () => {
            todoTextInput.value = '';
          },
        );
      }
    } catch (error) {}
  };

  toggleComplete = async (todoItem: TodoItemType) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
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
