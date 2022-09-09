import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';


declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'initial'
  },
  title: {
    marginBottom: '30px'
  },
  header: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    maxWidth: 300,
    // margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  media: {
    paddingTop: '56.25%'
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1)
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing(1),
    }
  }
}));



export { useStyles };