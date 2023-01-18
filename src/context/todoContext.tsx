import React, {
  PureComponent,
  createContext,
  PropsWithChildren,
  createRef,
} from 'react';
import { FilterType, StatusType, TodoItemType } from '../../types/types';
import axiosInstance from '../utils/axiosInstance';

type TodoContextType = {
  loadTodo: (filterType: FilterType) => Promise<void>;
  addTodo: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  toggleComplete: (todoItem: TodoItemType) => Promise<void>;
  deleteTodo: (todoItem: TodoItemType) => Promise<void>;
  todoList: TodoItemType[];
  getStatusDetails: (
    id: number,
    type: string,
    action: 'REQUEST' | 'FAIL',
  ) => StatusType | undefined;
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

  request = (id, type) => {
    this.setState(({ status }) => {
      return { status: [...status, { id: id, type, action: 'REQUEST' }] };
    });
  };

  success = (id, type) => {
    this.setState(({ status }) => {
      return {
        status: status.filter((x) => !(x.type === type && x.id === id)),
      };
    });
  };

  fail = (id, type, error) => {
    this.setState(({ status }) => {
      return {
        status: status.map((x) => {
          if (x.type === type && x.id === id) {
            return { ...x, action: 'FAIL', error };
          }
          return x;
        }),
      };
    });
  };

  async componentDidMount() {
    this.loadTodo(FilterType.all);
  }

  loadTodo = async (filterType: FilterType) => {
    const type = 'LOAD_TODO';
    try {
      this.request(-1, type);

      let url = 'todoList';

      if (filterType !== FilterType.all) {
        url = `${url}?isDone=${filterType === FilterType.completed}`;
      }

      const res = await axiosInstance.get(url);

      this.setState({ todoList: res.data });
      this.success(-1, type);
    } catch (error) {
      this.fail(-1, type, error);
    }
  };

  addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    const type = 'ADD_TODO';
    try {
      event.preventDefault();
      this.request(-1, type);
      const todoTextInput = this.todoTextInput.current;
      if (todoTextInput) {
        const todoText = todoTextInput.value;
        const res = await axiosInstance.post('todoList', {
          text: todoText,
          isDone: false,
        });

        this.setState(
          ({ todoList }) => {
            return {
              todoList: [...todoList, res.data],
            };
          },
          () => {
            todoTextInput.value = '';
          },
        );
        this.success(-1, type);
      }
    } catch (error) {
      this.fail(-1, type, error);
    }
  };

  toggleComplete = async (todoItem: TodoItemType) => {
    const type = 'UPDATE_TODO';
    try {
      this.request(todoItem.id, type);
      const res = await axiosInstance.put(`todoList/${todoItem.id}`, {
        ...todoItem,
        isDone: !todoItem.isDone,
      });

      this.setState(({ todoList, status }) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            res.data,
            ...todoList.slice(index + 1),
          ],
        };
      });
      this.success(todoItem.id, type);
    } catch (error) {
      this.fail(todoItem.id, type, error);
    }
  };

  deleteTodo = async (todoItem: TodoItemType) => {
    const type = 'DELETE_TODO';
    try {
      this.request(todoItem.id, type);
      await axiosInstance.delete(`todoList/${todoItem.id}`);

      this.setState(({ todoList, status }) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
      this.success(todoItem.id, type);
    } catch (error) {
      this.fail(todoItem.id, type, error);
    }
  };

  getStatusDetails = (id: number, type: string, action: 'REQUEST' | 'FAIL') => {
    const res = this.state.status.find(
      (x) => x.id === id && x.type === type && x.action === action,
    );

    return res;
  };

  render() {
    const { children } = this.props;
    const { todoList, status } = this.state;

    console.log('status', status);

    return (
      <TodoContext.Provider
        value={{
          loadTodo: this.loadTodo,
          addTodo: this.addTodo,
          toggleComplete: this.toggleComplete,
          deleteTodo: this.deleteTodo,
          getStatusDetails: this.getStatusDetails,
          todoList,
          todoTextInput: this.todoTextInput,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  }
}
