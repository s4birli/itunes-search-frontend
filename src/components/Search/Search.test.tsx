import { render } from '@testing-library/react';
import Search from './Search';

describe('<Search />', () => {
  it('should render', () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });
});
