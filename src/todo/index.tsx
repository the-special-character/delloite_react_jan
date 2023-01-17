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
  // based on props if you want to define state value
  // to bnd a method
  // analytics
  constructor(props: Props) {
    super(props);
    this.state = {
      todoList: [] as TodoItemType[],
      filterType: FilterType.all,
      status: [] as StatusType[],
    };
  }

  todoTextInput = createRef<HTMLInputElement>();

  async componentDidMount() {
    this.loadTodo(FilterType.all);
  }

  loadTodo = async (filterType: FilterType) => {
    const type = 'LOAD_TODO';
    try {
      this.setState(({ status }) => {
        return { status: [...status, { id: -1, type, action: 'REQUEST' }] };
      });

      let url = 'http://localhost:3000/todoList';

      if (filterType !== FilterType.all) {
        url = `${url}?isDone=${filterType === FilterType.completed}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      this.setState(({ status }) => {
        return {
          todoList: json,
          status: status.filter((x) => x.type !== type),
        };
      });
    } catch (error) {
      this.setState(({ status }, props) => {
        return {
          status: status.map((x) => {
            if (x.type === type) {
              return { ...x, action: 'FAIL', error };
            }
            return x;
          }),
        };
      });
    }
  };

  addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    const type = 'ADD_TODO';
    try {
      event.preventDefault();
      this.setState(({ status }) => {
        return { status: [...status, { id: -1, type, action: 'REQUEST' }] };
      });
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
          ({ todoList, status }) => {
            return {
              todoList: [...todoList, json],
              status: status.filter((x) => x.type !== type),
            };
          },
          () => {
            todoTextInput.value = '';
          },
        );
      }
    } catch (error) {
      this.setState(({ status }, props) => {
        return {
          status: status.map((x) => {
            if (x.type === type) {
              return { ...x, action: 'FAIL', error };
            }
            return x;
          }),
        };
      });
    }
  };

  toggleComplete = async (todoItem: TodoItemType) => {
    const type = 'UPDATE_TODO';
    try {
      this.setState(({ status }) => {
        return {
          status: [...status, { id: todoItem.id, type, action: 'REQUEST' }],
        };
      });
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(({ todoList, status }) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
          status: status.filter(
            (x) => !(x.type === type && x.id === todoItem.id),
          ),
        };
      });
    } catch (error) {
      this.setState(({ status }, props) => {
        return {
          status: status.map((x) => {
            if (x.type === type && x.id === todoItem.id) {
              return { ...x, action: 'FAIL', error };
            }
            return x;
          }),
        };
      });
    }
  };

  deleteTodo = async (todoItem: TodoItemType) => {
    const type = 'DELETE_TODO';
    try {
      this.setState(({ status }) => {
        return {
          status: [...status, { id: todoItem.id, type, action: 'REQUEST' }],
        };
      });
      await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: 'DELETE',
      });

      this.setState(({ todoList, status }) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
          status: status.filter(
            (x) => !(x.type === type && x.id === todoItem.id),
          ),
        };
      });
    } catch (error) {
      this.setState(({ status }, props) => {
        return {
          status: status.map((x) => {
            if (x.type === type && x.id === todoItem.id) {
              return { ...x, action: 'FAIL', error };
            }
            return x;
          }),
        };
      });
    }
  };

  render() {
    console.log('render');

    const { todoList, status } = this.state;

    const loadTodoStatus = status.find((x) => x.type === 'LOAD_TODO');

    const addTodoStatus = status.find((x) => x.type === 'ADD_TODO');

    const updateTodoStatus = status.filter((x) => x.type === 'UPDATE_TODO');

    const deleteTodoStatus = status.filter((x) => x.type === 'DELETE_TODO');

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-4xl font-bold my-10">Todo App</h1>
        <TodoForm
          addTodo={this.addTodo}
          ref={this.todoTextInput}
          addTodoStatus={addTodoStatus}
        />
        <div className="w-full flex-1">
          {loadTodoStatus?.action === 'REQUEST' && (
            <p className="text-center text-3xl text-green-400">Loading....</p>
          )}
          {loadTodoStatus?.action === 'FAIL' && (
            <p className="text-center text-3xl text-red-400">
              {loadTodoStatus.error?.message}
            </p>
          )}
          {todoList && (
            <TodoList
              todoList={todoList}
              toggleComplete={this.toggleComplete}
              deleteTodo={this.deleteTodo}
              updateTodoStatus={updateTodoStatus}
              deleteTodoStatus={deleteTodoStatus}
            />
          )}
        </div>
        <TodoFilter setFilterType={this.loadTodo} />
      </div>
    );
  }
}

export default Todo;
