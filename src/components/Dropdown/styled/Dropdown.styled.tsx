import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  select: {
    '&> .MuiSelect-select': {
      color: '#fff',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    '&> .MuiSelect-select > fieldset': {
      borderColor: '#313132 !important'
    },
  },
  label: {
    color: '#fff',
    '&[data-shrink=true]': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
    transform: 'traslate(14px, 12px) scale(1)',
    borderColor: '#313132'
  },
  outline: {
    borderColor: '#313132 !important'
  }
}));


export default useStyles;
