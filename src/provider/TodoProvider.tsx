import { createContext, ReactNode, useContext, useReducer } from "react";
import JSConfetti from 'js-confetti'

export type Todo = {
    id: number;
    name: string;
    completed: boolean;
}

type TodoContextType = {
    todos: Todo[];
    createTodo: (data: Todo) => void,
    completeTodo: (todo: Todo) => void,
    deleteTodo: (todo: Todo) => void;
    editTodo: (todo: Todo) => void;
}

type State = {
    todos: Todo[],
}

type CREATE_TODOS = {
    type: "CREATE_TODOS",
    payload: Todo,
}

type SET_TODOS = {
    type: "SET_TODOS",
    payload: Todo[],
}

type Action = CREATE_TODOS | SET_TODOS;

const storedData = localStorage.getItem('todos');

const initialState: State = {
    todos: storedData ? JSON.parse(storedData) : []
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'CREATE_TODOS':
            return {...state, todos: [...state.todos, action.payload]}
        case 'SET_TODOS':
                return {...state, todos: action.payload}
        default:
            return state;
    }
}

const TodoContext = createContext<TodoContextType>({
    todos: [],
    createTodo() {
        
    },
    completeTodo(){

    },
    deleteTodo() {
        
    },
    editTodo() {
        
    },
});

export const TodoProvider = ({children} : {children: ReactNode}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const createTodo = (data: Todo) => {
       const updatedTodos = [...state.todos, data];
       dispatch({ type: "CREATE_TODOS", payload: data });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    const editTodo = (todo: Todo) => {
        const updatedTodo = state.todos.map((t) => {
              if(t.id === todo.id){
                  return {
                     ...todo
                  }
              }else{
                 return t;
              }
        });

        dispatch({type: "SET_TODOS", payload: updatedTodo})
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    const deleteTodo = (todo: Todo) => {
        const updatedTodo = state.todos.filter((t) => t.id !== todo.id);
        dispatch({type: "SET_TODOS", payload: updatedTodo});
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    const completeTodo = (todo: Todo) => {
        const updatedTodo = state.todos.map((t) => {
            if(t.id === todo.id){
                if(!t.completed){
                    const jsConfetti = new JSConfetti()
                    jsConfetti.addConfetti()
                }
                return {
                    ...t,
                    completed: !t.completed
                }
            } 
            return t;    
        });
        dispatch({type: "SET_TODOS", payload: updatedTodo});
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    return (
        <TodoContext.Provider value={{todos: state.todos, createTodo, completeTodo, editTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext);