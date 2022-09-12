import { render } from '../../test-utils';
import Body from './Body';

describe('<Body />', () => {
  it('should render', () => {
    const { container } = render(<Body />);
    expect(container).toMatchSnapshot();
  });
});
