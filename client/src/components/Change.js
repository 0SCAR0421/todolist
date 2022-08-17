import axios from 'axios';
import { useState } from "react";
import styled from 'styled-components';

const Change = ({data, setMode, setTopic}) => {
  const [value, setValue] = useState(data.title)

  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }

  const onTodoChangeHandler = async () => {
    await axios.patch(`http://localhost:3000/posts/${data.id}`, {
      title: value
    })

    setTopic((prev) => {
      prev.title = value
      return prev
    })

    setMode(false)
  }

  const onTodoCancelHandler = () => {
    setMode(false)
  }

  return(
    <>
      <ChangeContainer>
        <textarea value={value} onChange={onChangeHandler}></textarea>
        <div>
          <span onClick={onTodoChangeHandler}>확인</span>
          <span onClick={onTodoCancelHandler}>취소</span>
        </div>
      </ChangeContainer>
    </>
  )
}

const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  > textarea{
    border: none;
    background: inherit;
    color: #1C3879;
    font-size: 24px;
    width: 233px;
    font-weight: 400;
    resize: none;
  }

  > div{
    display: flex;
    align-self: flex-end;
  }

  > div > span{
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
  }
`

export default Change