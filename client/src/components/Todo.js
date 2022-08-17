import axios from 'axios';
import { useState } from "react";
import styled from 'styled-components';
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

  const onChangeCheckbox = async (e) => {
    await axios.patch(`http://localhost:3000/posts/${data.id}`, {
      isDone: e.target.checked
    })
  }

  return(
    <TodoContainer>
      {
        mode ? 
        <>
          <Change data={topic} setMode={setMode} setTopic={setTopic}></Change>
        </> :
        <>
          <span className='title'>{topic.title}</span>
          <div>
            <input type='checkbox' defaultChecked={topic.isDone} onChange={onChangeCheckbox}></input>
            <div>
              <span onClick={() => setMode(!mode)}>수정</span>
              <span onClick={() => onDeleteHandler(topic.id)}>삭제</span>
            </div>
          </div>
        </>
      }
    </TodoContainer>
  )
}

const TodoContainer = styled.div`
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);
  background: #EAE3D2;
  border-radius: 5px;
  height: 140px;
  width: 265px;
  color: #1C3879;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;

  > span.title{
    font-size: 24px;
    font-weight: 400;
  }

  > div{
    display: flex;
    justify-content: space-between;
  }

  > div > div > span{
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
  }
`

export default Todo
