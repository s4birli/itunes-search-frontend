import type { FC } from 'react';
import List from '../../components/List';
import BodyStyled from './styled/Body.styled';

const Body: FC = () => {
  return (
    <>
      <BodyStyled>
        <List />
      </BodyStyled>
    </>
  );
};

export default Body;
