import Todolist from "./components/Todolist";
import styled from 'styled-components';

function App() {
  return (
    <BackgroundContainer>
      <Todolist />
    </BackgroundContainer>
  );
}

const BackgroundContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export default App;
