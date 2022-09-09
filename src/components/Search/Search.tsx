import { FC } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import useStyles from './styled/Search.styled';
import { InputBase } from '@mui/material';
import { SearchProps } from './Search.types';

const Search: FC<SearchProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <SearchIcon />
      </div>
      <InputBase {...props} className={classes.input} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
    </div>
  );
};

export default Search;
