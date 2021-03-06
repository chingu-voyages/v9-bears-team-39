import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    width: '-webkit-fill-available',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
}));

export default function FormButton(props) {
  const styles = useStyles();
  // eslint-disable-next-line react/prop-types
  const {
    id,
    label,
    value,
    onChange,
    multiline,
    rows,
    variant = 'standard',
  } = props;
  return (
    <TextField
      className={styles.textField}
      required
      multiline={multiline}
      rows={rows}
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      variant={variant}
    />
  );
}
