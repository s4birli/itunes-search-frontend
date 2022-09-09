import MockAdapter from 'axios-mock-adapter';
import { createNewStore, AppStore } from '../configureStore';
import { newSearch, continueSearch, searchSlice, ITunesData } from '../states/SearchState';
import API from '../httpService';

describe('Social Tests', () => {
  let fakeAxios: MockAdapter;
  let store: AppStore;

  beforeEach(() => {
    fakeAxios = new MockAdapter(API.instance);
    store = createNewStore();
  });

  const searchState = () => store.getState().search;
  const errorState = () => store.getState().error;

  describe('newSearch reducer', () => {
    it('should save returned values into the result state', async () => {
      const searchResult = { resultCount: 1, results: [ { artistId: 1 } ]};
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().result).toHaveLength(1);
      expect(searchState().result).toEqual(expect.arrayContaining([ expect.objectContaining(searchResult.results[0]) ]));
    });

    it('should set endOfRecords to true, if received data less than limit', async () => {
      const searchResult = { resultCount: 1, results: [ { artistId: 1 } ]};
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().endOfRecords).toBe(true);
    });

    it('should set endOfRecords to false, if received data equals to limit', async () => {
      const searchResult = { resultCount: 10, results: new Array(10).map((_, i) => ({ artistId: i })) };
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().endOfRecords).toBe(false);
    });

    it('should not return error if result is not valid ', async () => {
      fakeAxios.onGet(/(\/search)+/).reply(200, {});

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().result).toHaveLength(0);
    });

    it('should save error into the error state', async () => {
      const errorCode = 500;
      fakeAxios.onGet(/(\/search)+/).reply<string>(errorCode);

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(errorState().list).toHaveLength(1);
      expect(errorState().list[0].code).toBe(errorCode);
    });
  });

  describe('continueSearch reducer', () => {
    const initialSearchResult = {
      resultCount: 10,
      results: new Array(10).map((_, i) => ({ artistId: i })),
    };

    it('should save returned values into the result state', async () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, initialSearchResult);
      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      const searchResult = { resultCount: 1, results: [ { artistId: 1000 } ]};
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);

      await store.dispatch(continueSearch());

      expect(searchState().result).toHaveLength(initialSearchResult.resultCount + 1);
      expect(searchState().result).toEqual(expect.arrayContaining([ expect.objectContaining(searchResult.results[0]) ]));
    });

    it('should not call the api if the term is empty', async () => {
      fakeAxios.onGet(/(\/search)+/);
      store.dispatch(searchSlice.actions.searchRenewed({ term: '', entity: [ 'song' ]}));

      await store.dispatch(continueSearch());

      expect(fakeAxios.history.get.length).toBe(0);
    });

    it('should not call the api if the entity is empty', async () => {
      fakeAxios.onGet(/(\/search)+/);
      store.dispatch(searchSlice.actions.searchRenewed({ term: 'Test', entity: []}));

      await store.dispatch(continueSearch());

      expect(fakeAxios.history.get.length).toBe(0);
    });

    it('should not return error if result is not valid ', async () => {
      fakeAxios.onGet(/(\/search)+/).reply(200, {});

      await store.dispatch(continueSearch());

      expect(searchState().result).toHaveLength(0);
    });

    it('should save error into the error state', async () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, initialSearchResult);
      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      const errorCode = 500;
      fakeAxios.onGet(/(\/search)+/).reply<string>(errorCode);

      await store.dispatch(continueSearch());

      expect(errorState().list).toHaveLength(1);
      expect(errorState().list[0].code).toBe(errorCode);
    });

    it('should call api with correct offset', async () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, initialSearchResult);
      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      const errorCode = 500;
      fakeAxios.onGet(/(\/search)+/).reply<string>(errorCode);

      await store.dispatch(continueSearch());

      expect(fakeAxios.history.get.length).toBe(2);
      const secondRequestURL = new URL(fakeAxios.history.get[1].url as string, 'https://test');
      expect(parseInt(secondRequestURL.searchParams.get('offset') as string)).toBe(initialSearchResult.resultCount + 1);
    });

    it('should set endOfRecords to true, if received data less than limit', async () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, initialSearchResult);
      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().endOfRecords).toBe(false);

      const searchResult = { resultCount: 1, results: [ { artistId: 1000 } ]};
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);

      await store.dispatch(continueSearch());

      expect(searchState().endOfRecords).toBe(true);
    });
  });

  describe('loading indicator', () => {
    it('should be true while fetching the search', () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(() => {
        expect(searchState().isLoading).toBe(true);
        return [ 200, {} ];
      });

      store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));
    });

    it('should be false after the results are fetched', async () => {
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, { resultCount: 0, results: []});

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().isLoading).toBe(false);
    });

    it('should be false if the server returns an error', async () => {
      fakeAxios.onGet(/(\/search)+/).reply(500);

      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));

      expect(searchState().isLoading).toBe(false);
    });
  });
});
export {};
