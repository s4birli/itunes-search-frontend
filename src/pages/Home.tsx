import { Checkbox, CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector, newSearch, continueSearch, SearchEntityParameter } from '../store';
import Header from '../components/Header';
import Body from '../components/Body';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const textbox = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const [ entities, setEntities ] = useState<SearchEntityParameter>(search.entity || []);

  const handleSearch = () => {
    if (!textbox.current?.value) {
      return alert('Please enter search value');
    }

    if (!(entities && entities.length > 0)) {
      return alert('Please select one of the kinds at least');
    }

    dispatch(newSearch({ term: textbox.current?.value, entity: entities }));
  };

  const handleCheckboxes = (entity: 'musicArtist' | 'song' | 'album', active: boolean) => {
    console.log(entity, active, entities);
    if (active) setEntities([ ...entities, entity ]);
    else setEntities(entities.filter((e) => e !== entity));
  };

  const getEntityChecked = (entity: string) => {
    return Boolean(entities.find((e) => e === entity));
  };
  return (
    //Header
    //card
    <>
      <Header />
      <Body />
      {/* <label>
        <Checkbox title="Songs" checked={getEntityChecked('song')} onChange={(event) => handleCheckboxes('song', event.target.checked)} />
        Songs
      </label>
      <label>
        <Checkbox
          title="Artists"
          checked={getEntityChecked('musicArtist')}
          onChange={(event) => handleCheckboxes('musicArtist', event.target.checked)}
        />
        Artists
      </label>
      <label>
        <Checkbox title="Albums" checked={getEntityChecked('album')} onChange={(event) => handleCheckboxes('album', event.target.checked)} />
        Albums
      </label>
      <input ref={textbox} type="text"></input>
      <button onClick={handleSearch}>Search </button>
      <ul>{search && search.result && search.result.map((record) => <li key={record.trackNumber}>{record.artistName}</li>)}</ul>
      {search.isLoading && <CircularProgress />}
      {search.result && search.result.length > 0 && !search.endOfRecords && <button onClick={() => dispatch(continueSearch())}>Load more</button>} */}
    </>
  );
};

export default Home;
