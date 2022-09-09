import { FC, useEffect, useState } from 'react';
import { Box, Toolbar } from '@mui/material';

import Search from '../Search';
import Dropdown from '../Dropdown';
import { OutBoxStyled, AppBarStyled, InBoxStyled } from './styled/Header.styled';
import { useAppDispatch, useAppSelector, newSearch, searchRenewed, SearchEntityParameter } from '../../store';
import InputBase from '@mui/material/InputBase';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const [ term, setTerm ] = useState(search.term);
  const [ entity, setEntity ] = useState(search.entity as string[]);

  useEffect(() => {
    if (!term || !(entity && entity.length > 0)) {
      dispatch(searchRenewed({ term, entity: entity as SearchEntityParameter }));
      return;
    }

    dispatch(newSearch({ term, entity: entity as SearchEntityParameter }));
  }, [ term, entity ]);

  let lastTermChanged = 0;
  let lastChangedValue = '';
  let intervalId = 0;

  const handleTermChange = (value: string) => {
    lastTermChanged = Date.now();
    lastChangedValue = value;
    if (!intervalId)
      intervalId = window.setInterval(() => {
        if (lastTermChanged + 3000 < Date.now()) {
          setTermState(lastChangedValue);
        }
      }, 1000);
  };

  const setTermState = (value: string) => {
    window.clearInterval(intervalId);
    intervalId = 0;
    setTerm(value);
  };

  return (
    <>
      <AppBarStyled>
        <Toolbar>
          <OutBoxStyled>
            <InBoxStyled>
              <Search
                onChange={(event) => handleTermChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') setTermState((event.target as any).value);
                }}
              />
              <Dropdown value={entity} onChange={(event) => setEntity(event.target.value as string[])} />
            </InBoxStyled>
          </OutBoxStyled>
        </Toolbar>
      </AppBarStyled>
    </>
  );
};

export default Header;
