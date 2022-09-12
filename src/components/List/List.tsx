import { Card, CardMedia, Grid, CardContent, Typography, Link, Divider, CardActions, CircularProgress } from '@mui/material';
import { FC, useState } from 'react';
import { useStore } from 'react-redux';
import { useStyles } from './styled/List.styled';
import { useAppDispatch, continueSearch, ISearchState, RootState } from '../../store';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@mui/system';
import { ListTypeProps } from './List.types';
import { ITunesResult } from '../../store';

const List: FC<ListTypeProps> = () => {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();
  const [ searchState, setSearchState ] = useState<ISearchState | null>(store.getState().search);

  store.subscribe(() => {
    setSearchState(store.getState().search);
  });
  const isSearchNotFound = () =>
    searchState &&
    searchState.result.length === 0 &&
    searchState.term &&
    searchState.entity &&
    searchState.entity.length > 0 &&
    !searchState.isLoading;

  let loadMoreIsStarted = false;
  const handleLoadMore = () => {
    if (!loadMoreIsStarted && !searchState?.isLoading) {
      loadMoreIsStarted = true;
      dispatch(continueSearch());
    }
  };

  const classes = useStyles();
  const renderCard = (cards: ITunesResult, index: number) => {
    const imgUrl = cards.artworkUrl100?.replace('100x100bb', '1200x1200bb');
    return (
      <Card key={index} sx={{ minHeight: '100%' }} className={classes.card}>
        <CardMedia component={() => <img style={{ width: '100%' }} src={imgUrl} />} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom>
            {cards.trackName}
          </Typography>
          <Divider className={classes.divider} light />
          <CardActions>
            <Link href={cards.collectionViewUrl}>Visit Store</Link>
          </CardActions>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {searchState && searchState.result.length > 0 && (
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={handleLoadMore}
          hasMore={!searchState.endOfRecords}
          loader={
            <Box minHeight={100} width="100%">
              <CircularProgress />
              Loading ...
            </Box>
          }
        >
          <Grid
            key="1"
            sx={{
              marginTop: '50px',
              padding: 4,
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
            rowSpacing={3}
            columnSpacing={3}
            container
            spacing={1}
          >
            {searchState.result.map((record, index) => {
              return (
                <Grid key={index} item>
                  {renderCard(record, index)}
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      )}

      {isSearchNotFound() && <div className={classes.notFound}>Not found!</div>}
    </>
  );
};

export default List;
