import { render } from '@testing-library/react';
import List from './List';

describe('<List />', () => {
  it('should render', () => {
    const { container } = render(<List />);
    expect(container).toMatchSnapshot();
  });
});
