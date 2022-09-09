import { Card, CardMedia, Grid, CardContent, Typography, Divider, CardActions, Button, CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './styled/List.styled';
import { store, useAppDispatch, continueSearch, ISearchState } from '../../store';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@mui/system';
import { ListTypeProps } from './List.types';
import { Link } from 'react-router-dom';
import { ITunesResult } from '../../store';

const List: FC<ListTypeProps> = () => {
  const dispatch = useAppDispatch();
  const [ searchState, setSearchState ] = useState<ISearchState | null>(null);

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
  const [ isExpanded, setIsExpanded ] = useState<Record<string, boolean>>({});

  const renderCard = (cards: ITunesResult, index: number) => {
    return (
      <Card sx={{ minHeight: '100%' }} className={classes.card}>
        <CardMedia component={() => <img style={{ width: '100%' }} src={cards.artworkUrl100} />} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom>
            {cards.trackName}
          </Typography>
          <Typography
            sx={{
              display: 'block',
              overflow: 'hidden',
              maxHeight: isExpanded[index.toString()] ? '10000px' : '150px',
            }}
            className={'MuiTypography--subheading'}
            variant={'caption'}
          >
            {cards.collectionName + ' ' + cards.artistName}
          </Typography>
          {/* <Divider className={classes.divider} light /> */}
          <CardActions>
            <Button
              onClick={() => {
                const newExpanded = { ...isExpanded };
                newExpanded[index.toString()] = !newExpanded[index.toString()];
                setIsExpanded(newExpanded);
              }}
              size="medium"
            >
              {isExpanded ? 'Less Detail' : 'More Detail'}
            </Button>
            <Link to="https://google.com">Go to </Link>
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
      {isSearchNotFound() && <div>Not found!</div>}
      {searchState?.isLoading && <CircularProgress />}
    </>
  );
};

export default List;
