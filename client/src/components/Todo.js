import axios from 'axios';
import { useState } from "react";
import Change from './Change';

const Todo = ({data, setTodolist}) => {
  const [mode, setMode] = useState(false)
  const [topic, setTopic] = useState(data)

  const onDeleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`)
    setTodolist((prev) => 
      prev.filter(e => e.id !== id)
    )
  }

  return(
    <div>
      {
        mode ? 
        <>
          <Change data={topic} setMode={setMode} setTopic={setTopic}></Change>
        </>:
        <>
          <span>{topic.title}</span>
          <input type='checkbox' defaultChecked={topic.isDone}></input>
          <button onClick={() => setMode(!mode)}>수정</button>
          <button onClick={() => onDeleteHandler(topic.id)}>삭제</button>
        </>
      }
    </div>
  )
}

export default Todo
