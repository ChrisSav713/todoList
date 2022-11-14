import React from 'react'
import {TodoContext} from '../App'

export default function Todo(props) {
    const {id, checked, content} = props
    const {handleTodoDelete, handleTodoTextChange, handleTodoChecked} = React.useContext(TodoContext)
        
    return (
        <div className="todoItem">
            {checked 
                ? <input onClick={e => handleTodoChecked(id, !checked)} className="todoItem--check" type="checkbox" checked/> 
                : <input onClick={e => handleTodoChecked(id, !checked)} className="todoItem--check" type="checkbox"/>
            }
            {checked
                ? <input className="todoItem--text strike" disabled type="text" value={content}/>
                : <input onInput={e => handleTodoTextChange(id, e.target.value)} className="todoItem--text" type="text" value={content}/>
            }
            <button onClick={() => handleTodoDelete(id)} className="todoItem--delete">Delete</button>
        </div>
    )
}
