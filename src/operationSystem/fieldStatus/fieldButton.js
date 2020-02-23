import React from 'react'


const fieldButton = () =>
{
    const toDoList = todos.length ? (
        todos.map(todo =>{
            return(
           <div className="collection-item" key={todos.id} >
                <span onClick={()=>{deleteTodo(todo.id)}}>
                    {todo.content}
                </span>
           </div>
            )
        })

    ) :(<p className="center">Nothing in the Todo List, YAy</p>)
   
    return (
    <div className="todos collection">
        {toDoList}
        </div>
   )
}

export default fieldButton; 