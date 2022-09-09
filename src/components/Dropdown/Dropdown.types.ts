import { InputBaseProps } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
export interface DropdownProps extends Omit<InputBaseProps, 'value' | 'onChange'> {
    onChange?: SelectInputProps<string[]>['onChange'];
    value?: string[];
}
