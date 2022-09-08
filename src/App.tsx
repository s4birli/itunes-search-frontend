import styled from 'styled-components';
import Container from '@mui/material/Container';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Errors from './components/Errors';

function App() {
  return (
    <AppStyled>
      <BrowserRouter>
        <Container>
          <Errors />
          <Home></Home>
        </Container>
      </BrowserRouter>
    </AppStyled>
  );
}

const AppStyled = styled.div``;
export default App;
