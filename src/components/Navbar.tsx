import React, { useReducer } from 'react';
import CreateTodo from './modals/CreateTodo';

type State = {
    openCreateModal: boolean;
}

type Action = {
    type: "SET_OPEN_CREATE_MODAL",
    payload: boolean,
}

const initialState: State = {
    openCreateModal: false
}

const reducer = (state: State, action: Action): State => {
    switch(action.type){
        case 'SET_OPEN_CREATE_MODAL':
            return {...state, openCreateModal:action.payload}
        default:
            return state;
    }
}

const Navbar = () => {

   const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {state.openCreateModal && <CreateTodo closeModal={() => dispatch({type: "SET_OPEN_CREATE_MODAL", payload: false})} />}
      <nav className='flex items-center justify-center w-full mt-[2rem] mx-auto'>
        <div className='flex items-center justify-between w-[50%]'>
        <h1 className='text-[2rem] font-bold'>My Tasks</h1>

         <button onClick={() => dispatch({type: 'SET_OPEN_CREATE_MODAL', payload: true})} className='bg-[#000] text-white p-[.7rem] rounded-[.5rem]'>
        Create Tasks
        </button>
        </div>
    </nav>
    </>
  )
}

export default Navbar