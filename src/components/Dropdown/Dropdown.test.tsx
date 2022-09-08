import { render } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  it('should render', () => {
    const { container } = render(<Dropdown />);
    expect(container).toMatchSnapshot();
  });
});
