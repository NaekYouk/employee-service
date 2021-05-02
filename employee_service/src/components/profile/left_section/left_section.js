import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    width: 400,
    padding: 10,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: '50%',
  },
}));

const LeftSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img
        className={classes.image}
        src="https://place-hold.it/128/333"
        alt="avatar"
      />
      <h4>-Mr-</h4>
      <h3>Vladislav Ustsinovich</h3>
    </Box>
  );
};

export default LeftSection;
