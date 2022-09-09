import styled from 'styled-components';
import { InputLabel, OutlinedInput } from '@mui/material';

const InputLabelStyled = styled(InputLabel)({
  color: '#fff',
  '&[data-shrink=true]': {
    transform: 'translate(14px, -9px) scale(0.75)',
  },
  transform: 'traslate(14px, 12px) scale(1)',
  borderColor: '#313132'
});

const OutlinedInputStyled = styled(OutlinedInput)({
  borderColor: '#313132 !important'
});


export { InputLabelStyled, OutlinedInputStyled };
