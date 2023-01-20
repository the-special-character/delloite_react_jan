import React, {
  createContext,
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
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
  todoTextInput?: React.MutableRefObject<HTMLInputElement>;
};

export const TodoContext = createContext<TodoContextType>({
  loadTodo: async () => {},
  addTodo: async () => {},
  toggleComplete: async () => {},
  deleteTodo: async () => {},
  todoList: [],
  getStatusDetails: (id, type, action) => {
    return undefined;
  },
  todoTextInput: undefined,
});

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
  status: StatusType[];
};

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.all);
  const [status, setStatus] = useState<StatusType[]>([]);
  const todoTextInput = useRef<HTMLInputElement>();

  const request = (id: number, type: string) => {
    setStatus((value) => [...value, { id: id, type, action: 'REQUEST' }]);
  };

  const success = (id: number, type: string) => {
    setStatus((val) => val.filter((x) => !(x.type === type && x.id === id)));
  };

  const fail = (id: number, type: string, error: Error) => {
    setStatus((val) =>
      val.map((x) => {
        if (x.type === type && x.id === id) {
          return { ...x, action: 'FAIL', error };
        }
        return x;
      }),
    );
  };

  useEffect(() => {
    loadTodo(FilterType.all);
  }, []);

  const loadTodo = async (ft: FilterType) => {
    const type = 'LOAD_TODO';
    try {
      request(-1, type);

      let url = 'todoList';

      if (ft !== FilterType.all) {
        url = `${url}?isDone=${filterType === FilterType.completed}`;
      }

      const res = await axiosInstance.get(url);

      setTodoList(res.data);
      setFilterType(ft);
      success(-1, type);
    } catch (error) {
      fail(-1, type, error);
    }
  };

  const addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    const type = 'ADD_TODO';
    try {
      event.preventDefault();
      request(-1, type);
      if (todoTextInput?.current) {
        const todoText = todoTextInput.current.value;
        const res = await axiosInstance.post('todoList', {
          text: todoText,
          isDone: false,
        });
        setTodoList((val) => [...val, res.data]);
        todoTextInput.current.value = '';
        success(-1, type);
      }
    } catch (error) {
      fail(-1, type, error);
    }
  };

  const toggleComplete = async (todoItem: TodoItemType) => {
    const type = 'UPDATE_TODO';
    try {
      request(todoItem.id, type);
      const res = await axiosInstance.put(`todoList/${todoItem.id}`, {
        ...todoItem,
        isDone: !todoItem.isDone,
      });

      setTodoList((val) => {
        const index = val.findIndex((x) => x.id === todoItem.id);
        return [
          ...todoList.slice(0, index),
          res.data,
          ...todoList.slice(index + 1),
        ];
      });
      success(todoItem.id, type);
    } catch (error) {
      fail(todoItem.id, type, error);
    }
  };

  const deleteTodo = async (todoItem: TodoItemType) => {
    const type = 'DELETE_TODO';
    try {
      request(todoItem.id, type);
      await axiosInstance.delete(`todoList/${todoItem.id}`);

      setTodoList((val) => {
        const index = todoList.findIndex((x) => x.id === todoItem.id);
        return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
      });

      success(todoItem.id, type);
    } catch (error) {
      fail(todoItem.id, type, error);
    }
  };

  const getStatusDetails = (
    id: number,
    type: string,
    action: 'REQUEST' | 'FAIL',
  ) => {
    const res = status.find(
      (x) => x.id === id && x.type === type && x.action === action,
    );
    return res;
  };

  return (
    <TodoContext.Provider
      value={{
        loadTodo,
        addTodo,
        toggleComplete,
        deleteTodo,
        getStatusDetails,
        todoList,
        todoTextInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
