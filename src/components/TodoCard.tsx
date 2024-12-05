import React, { useReducer } from 'react'
import { Todo, useTodo } from '../provider/TodoProvider'
import {FaEdit, FaTrash} from "react-icons/fa";
import EditTodo from './modals/EditTodo';

type State = {
  openEditModal: boolean;
}

type Action = {
  type: "SET_OPEN_EDIT_MODAL",
  payload: boolean;
}

const initialState: State = {
  openEditModal: false,
}

const reducer = (state: State, action: Action): State => {
    switch(action.type){
        case "SET_OPEN_EDIT_MODAL":
          return {...state, openEditModal: action.payload}
        default: 
        return state;
    }
}

const TodoCard = ({todo}: {todo: Todo}) => {

    const {completeTodo, deleteTodo} = useTodo();

    const [state, dispatch] = useReducer(reducer, initialState);

  return (

            <>
               {state.openEditModal && <EditTodo todo={todo} closeModal={() => dispatch({type: "SET_OPEN_EDIT_MODAL", payload: false})}/>}
              <div className='border shadow-md bg-[#fff] h-[4rem] w-[50%] mx-auto rounded-[1rem] p-[1rem] flex items-center justify-between'>
            <div className='flex items-center gap-[1rem]'>
              {
                todo.completed ? <input type="checkbox" className="checkbox cursor-pointer" checked onClick={() => completeTodo(todo)} /> : <input type="checkbox" className="checkbox cursor-pointer" onClick={() => completeTodo(todo)} />
              }
            <h2 className={`text-[1.5rem] ${todo.completed ? 'line-through' : ''}`}>{todo.name}</h2>
            </div>

            <div className='flex items-center gap-[1.5rem]'>
                <button type="button" onClick={() => dispatch({type: "SET_OPEN_EDIT_MODAL", payload: true})}><FaEdit size={19}/></button>
                <button type="button" onClick={() => deleteTodo(todo)}><FaTrash size={19} color='red'/></button>
            </div>
         </div>
            </>

  )
}

export default TodoCard