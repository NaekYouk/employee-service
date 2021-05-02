import React from 'react';
import Grid from '@material-ui/core/Grid';
import EmployeeCard from './employee_card/employee_card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 800,
  },
});

const EmployeesList = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify="center" spacing={8}>
      {[0, 1, 2, 4, 5, 6, 7].map((value) => (
        <Grid key={value} item>
          <EmployeeCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeesList;
