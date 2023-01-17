import React, {
  PureComponent,
  createContext,
  PropsWithChildren,
  createRef,
} from 'react';
import { FilterType, StatusType, TodoItemType } from '../../types/types';

type TodoContextType = {
  loadTodo: (filterType: FilterType) => Promise<void>;
  addTodo: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  toggleComplete: (todoItem: TodoItemType) => Promise<void>;
  deleteTodo: (todoItem: TodoItemType) => Promise<void>;
  todoList: TodoItemType[];
  todoTextInput: React.RefObject<HTMLInputElement>;
};

export const TodoContext = createContext<TodoContextType>({
  loadTodo: async () => {},
  addTodo: async () => {},
  toggleComplete: async () => {},
  deleteTodo: async () => {},
  todoList: [],
  todoTextInput: null,
});

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
  status: StatusType[];
};

export class TodoProvider extends PureComponent<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
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
      this.setState(({ status }) => {
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
    const { children } = this.props;
    const { todoList } = this.state;
    return (
      <TodoContext.Provider
        value={{
          loadTodo: this.loadTodo,
          addTodo: this.addTodo,
          toggleComplete: this.toggleComplete,
          deleteTodo: this.deleteTodo,
          todoList,
          todoTextInput: this.todoTextInput,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  }
}
