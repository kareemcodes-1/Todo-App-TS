import React from 'react'
import { useTodo } from '../provider/TodoProvider'
import TodoCard from './TodoCard';

const Todos = () => {

    const {todos} = useTodo();

  return (
    <div className='mt-[4rem] flex flex-col gap-[1.5rem] w-full'>
        {todos.map((todo) => (
            <div key={todo.id}>
                <TodoCard todo={todo} />
            </div>
        ))}
    </div>
  )
}

export default Todos