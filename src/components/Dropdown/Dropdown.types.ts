import { SelectChangeEvent } from '@mui/material/Select';
import { InputBaseProps } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

export interface DropdownProps extends Omit<InputBaseProps, 'value' | 'onChange'> {
  value?: string[];
  onChange?: SelectInputProps<string[]>['onChange'];
}
