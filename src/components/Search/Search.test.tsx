import { render } from '../../test-utils';

import Search from './Search';

describe('<Search />', () => {
  it('should render', () => {
    const { container } = render(
      <Search
        onKeyDown={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
