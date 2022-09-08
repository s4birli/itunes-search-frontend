import { render } from '@testing-library/react';
import Body from './Body';

describe('<Body />', () => {
  it('should render', () => {
    const { container } = render(<Body />);
    expect(container).toMatchSnapshot();
  });
});
