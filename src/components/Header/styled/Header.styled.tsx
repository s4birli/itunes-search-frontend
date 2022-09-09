import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';

const AppBarStyled = styled(AppBar)({
  backgroundColor: 'rgb(49 49 50)'
});

const OutBoxStyled = styled(Box)({
  padding: '10px 0px',
  overflow: 'auto',
  width: '100%',
});

const InBoxStyled = styled(Box)({
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  width: 'min-content',
  gap: 1,
  '&>*': {
    flexShrink: 1,
    width: 250,
    minWidth: 100,
    maxWidth: 300
  },
  '& > *:first-child': {
    width: 400,
    minWidth: 300,
    maxWidth: 550,
  }
});


export { AppBarStyled, OutBoxStyled, InBoxStyled };
