import MockAdapter from 'axios-mock-adapter';
import { createNewStore, AppStore } from '../../store/configureStore';
import { newSearch, ITunesData } from '../../store/states/SearchState';
import API from '../../store/httpService';

import * as utils from '../../test-utils';

const get_NewRender_With_Empty_Store = () => {
  const fakeAxios = new MockAdapter(API.instance);
  const store = createNewStore();
  const render = utils.createRenderWrapper(store);
  return { fakeAxios, render, store };
};

import List from './List';

describe('<List />', () => {
  describe('DOM Structure', () => {
    const { render } = get_NewRender_With_Empty_Store();
    it('should render empty list', () => {
      const { container } = render(<List />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Rendering Data', () => {
    let fakeAxios: MockAdapter;
    let store: AppStore;
    let render: typeof utils.render;
    const NotFoundMessage = 'Not found!';

    beforeEach(() => {
      const newRender = get_NewRender_With_Empty_Store();
      render = newRender.render;
      fakeAxios = newRender.fakeAxios;
      store = newRender.store;
    });

    const createNewSearchResult = async (recordCount: number) => {
      const searchResult = {
        resultCount: recordCount,
        results: Array.from(Array(recordCount).keys()).map((_, i) => ({ artistId: i + 1, trackName: 'Track ' + (i + 1) })),
      };
      fakeAxios.onGet(/(\/search)+/).reply<ITunesData>(200, searchResult);
      await store.dispatch(newSearch({ term: 'test', entity: [ 'song' ]}));
    };

    it('Should render search result', async () => {
      await createNewSearchResult(1);

      const { container, queryAllByText } = render(<List />);
      expect(queryAllByText('Track 1')).toHaveLength(1);
      expect(container).toMatchSnapshot();
    });

    it('Should not show not found if result is not empty', async () => {
      await createNewSearchResult(1);

      const { queryAllByText } = render(<List />);

      expect(queryAllByText(NotFoundMessage)).toHaveLength(0);
    });

    it('Should show not found message if result is empty', async () => {
      await createNewSearchResult(0);

      const { queryAllByText } = render(<List />);

      expect(queryAllByText(NotFoundMessage)).toHaveLength(1);
    });
  });
});
