import axios from 'axios';
import { useState, useEffect } from "react";
import styled from "styled-components";
import Todo from "./Todo"

const Todolist = () => {
  const [todolist, setTodolist] = useState([])
  const [value, setValue] = useState('')
  const [mode, setMode] = useState(false)

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/posts')
    setTodolist(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const onChangeHandler = (e) => {
    setValue(e.target.value)
  };

  const onSumbitHandler = async () => {
    const data = {
      id: Date.now(),
      title: value,
      isDone: false
    }

    await axios.post('http://localhost:3000/posts', data)

    setValue('')
    setTodolist((prev) => [...prev, data])
  }

  return (
    <TodolistContainer>
      <h1>TodoLists</h1>
      <TodoList>
        {
          todolist.map((e) => (
            <Todo key={e.id} data={e} setTodolist={setTodolist}>
            </Todo>
          ))
        }
      </TodoList>
      {
        mode ? 
        <CreateTodo>
          <input value={value} onChange={onChangeHandler}></input>
          <div>
            <div onClick={onSumbitHandler}>추가</div>
            <div onClick={() => setMode(!mode)}>취소</div>
          </div>
        </CreateTodo> : 
        <svg onClick={() => setMode(!mode)} xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M29 2.41666C14.3188 2.41666 2.41667 14.3187 2.41667 29C2.41667 43.6812 14.3188 55.5833 29 55.5833C43.6813 55.5833 55.5833 43.6812 55.5833 29C55.5833 14.3187 43.6813 2.41666 29 2.41666ZM31.4167 38.6667C31.4167 39.3076 31.1621 39.9223 30.7088 40.3755C30.2556 40.8287 29.6409 41.0833 29 41.0833C28.3591 41.0833 27.7444 40.8287 27.2912 40.3755C26.838 39.9223 26.5833 39.3076 26.5833 38.6667V31.4167H19.3333C18.6924 31.4167 18.0777 31.162 17.6245 30.7088C17.1713 30.2556 16.9167 29.6409 16.9167 29C16.9167 28.3591 17.1713 27.7444 17.6245 27.2911C18.0777 26.8379 18.6924 26.5833 19.3333 26.5833H26.5833V19.3333C26.5833 18.6924 26.838 18.0777 27.2912 17.6245C27.7444 17.1713 28.3591 16.9167 29 16.9167C29.6409 16.9167 30.2556 17.1713 30.7088 17.6245C31.1621 18.0777 31.4167 18.6924 31.4167 19.3333V26.5833H38.6667C39.3076 26.5833 39.9223 26.8379 40.3755 27.2911C40.8287 27.7444 41.0833 28.3591 41.0833 29C41.0833 29.6409 40.8287 30.2556 40.3755 30.7088C39.9223 31.162 39.3076 31.4167 38.6667 31.4167H31.4167V38.6667Z" fill="#1C3879"/>
        </svg>
      }
    </TodolistContainer>
  );
};

const TodolistContainer = styled.div`
  width: 590px;
  height: 830px;
  background: #F9F5EB;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);
  border-radius: 15px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
  }

  > h1 {
    padding: 0 20px;
    color: #1C3879;
    margin: 80px 0 50px 0;
    font-weight: 900;
  }

  > svg {
    position: sticky;
    bottom: 16px;
    left: calc(550px - 16px);
    cursor: pointer;
  }
`

const TodoList = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const CreateTodo = styled.div`
  width: 590px;
  height: 170px;
  background: #607EAA;
  position: sticky;
  left: 0;
  bottom: 0;
  border-radius: 15px 15px 0 0;
  padding: 20px;

  > input {
    border-radius: 10px;
    border: none;
    width: 550px;
    height: 60px;
    margin-bottom: 28px;
    padding: 0 20px;
    font-size: 24px;
  }

  > div {
    display: flex;
  }

  > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 265px;
    height: 40px;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    color: #1C3879;
    font-size: 24px;
    font-weight: 900;
  }

  > div > div:last-child {
    margin-left: 20px;
  }
`

export default Todolist;
