import { Checkbox, InputLabel } from '@mui/material';
import { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import useStyles from './styled/Dropdown.styled';
import { DropdownProps } from './Dropdown.types';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

const types = [ 'musicArtist', 'song', 'album' ];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Dropdown: FC<DropdownProps> = (props) => {
  const classes = useStyles();
  const [ entityTypes, setEntityTypes ] = useState<string[]>(props.value || []);
  const handleChange: SelectInputProps<string[]>['onChange'] = (event, child) => {
    const {
      target: { value },
    } = event;
    setEntityTypes(typeof value === 'string' ? value.split(',') : value);
    if (props.onChange) props.onChange(event, child);
  };

  return (
    <>
      <FormControl>
        <InputLabel id="multiple-checkbox-label" className={classes.label}>Entity Types</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          className={classes.select}
          value={entityTypes}
          onChange={handleChange}
          input={<OutlinedInput className={classes.outline} label="Entity" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={entityTypes.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;
