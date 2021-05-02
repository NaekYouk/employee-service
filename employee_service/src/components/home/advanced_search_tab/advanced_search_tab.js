import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    margin: '10px 0',
  },
  button: {
    marginTop: 12,
    width: '100%',
    height: 48,
  },
}));

const AdvancedSearchTab = () => {
  const classes = useStyles();

  return (
    <>
      <TextField
        className={classes.textField}
        label="Name"
        variant="outlined"
        placeholder="John Doe..."
        fullWidth
      />
      <TextField
        className={classes.textField}
        label="Email"
        variant="outlined"
        placeholder="example@emser.com"
        fullWidth
      />
      <TextField
        className={classes.textField}
        label="Room"
        variant="outlined"
        placeholder="701..."
        fullWidth
      />
      <Button className={classes.button} variant="contained" color="primary">
        Search
      </Button>
    </>
  );
};

export default AdvancedSearchTab;
