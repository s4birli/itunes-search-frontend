import userEvent from '@testing-library/user-event';

import { render, fireEvent } from '../../test-utils';

import Search from './Search';

describe('<Search />', () => {
  it('should render', () => {
    const { container } = render(<Search />);

    expect(container).toMatchSnapshot();
  });

  it('should implement the onChange event', async () => {
    const onChange = jest.fn();
    const value = 'Test Value';

    const { getByRole } = render(<Search onChange={onChange} />);
    await userEvent.click(getByRole('textbox'));
    await userEvent.paste(value);

    expect(onChange).toBeCalledTimes(1);
  });

  it('should implement the onKeydown event', async () => {
    const onKeydown = jest.fn();

    const { getByRole } = render(<Search onKeyDown={onKeydown} />);
    await userEvent.click(getByRole('textbox'));
    fireEvent.keyDown(getByRole('textbox'), new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13 }));

    expect(onKeydown).toBeCalledTimes(1);
  });
});
