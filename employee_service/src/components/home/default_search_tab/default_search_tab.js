import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginTop: 12,
    width: '100%',
    height: 48,
  },
}));

const DefaultSearchTab = () => {
  const classes = useStyles();

  return (
    <>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="John Doe"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button className={classes.button} variant="contained" color="primary">
        Search
      </Button>
    </>
  );
};

export default DefaultSearchTab;
