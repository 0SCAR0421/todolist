import axios from 'axios';
import { useState, useEffect } from "react";
import styled from "styled-components";
import Todo from "./Todo"

const Todolist = () => {
  const [todolist, setTodolist] = useState([])
  const [value, setValue] = useState('')

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
    <Container>
      <h1>Todolist</h1>
      <p>오늘의 할일 : {todolist.length}</p>
      <>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
        />
        <button
          onClick={onSumbitHandler}
        >
          등록
        </button>
      </>
      {
        todolist.map((e) => (
          <Todo key={e.id} data={e} setTodolist={setTodolist}>
          </Todo>
        ))
      }
    </Container>
  );
};

const Container = styled.div`
  background-color: tomato;
`

export default Todolist;
