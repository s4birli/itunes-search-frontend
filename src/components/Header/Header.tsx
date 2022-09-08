import type { FC } from 'react';
import Search from '../../components/Search';
import Dropdown from '../../components/Dropdown';

const Header: FC = () => {
  return (
    <>
      <Search />
      <Dropdown />
    </>
  );
};

export default Header;
