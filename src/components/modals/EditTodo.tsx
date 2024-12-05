import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Todo, useTodo } from '../../provider/TodoProvider';

interface EditTodoProps {
    todo: Todo,
    closeModal: () => void,
}

type FormData = {
    id: number;
    name: string;
    completed: boolean;
}

const EditTodo: FC<EditTodoProps> = ({todo, closeModal}) => {

    const {editTodo} = useTodo();

    const {register, handleSubmit, formState: {isSubmitting, errors}} = useForm<FormData>({
        defaultValues: {
            id: todo.id,
            name: todo.name,
            completed: todo.completed,
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        editTodo(data);
        closeModal();
    }

  return (
    createPortal(
        <div className='fixed w-full h-screen top-0 left-0 right-0'> 
            <div className='bg-[#0000004f] fixed top-0 w-full h-screen' onClick={closeModal}/>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center mx-auto gap-[1rem] mt-[10rem]'>
            <div className='bg-[#fff] z-[1000] p-[1rem] w-[50%] rounded-[1rem] flex items-start justify-center flex-col'>
                <input {...register('name', {required: 'Name is required'})} type="text" className='w-full h-full bg-transparent outline-none' placeholder='Enter todo...'  id="" />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>

            <button className='border z-[1000] shadow-md bg-[#fff] w-[5rem] rounded-[1rem] py-[.7rem] px-[1rem] gap-[1rem]' type='submit'>{isSubmitting ? 'Loading...' : 'Save'}</button>
            </form>
        </div>, document.body
    )
  )
}

export default EditTodo