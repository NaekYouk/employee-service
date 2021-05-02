import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import LeftSection from './left_section/left_section';
import RightSection from './right_section/right_section';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: '14px 0',
    margin: '24px auto',
    maxWidth: 900,
    height: 600,
  },
  leftSide: {
    textAlign: 'center',
    width: 270,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: '50%',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { id } = useParams();
  console.log('profile id: ', id);

  return (
    <Paper className={classes.paper}>
      <LeftSection />
      <Divider orientation="vertical" flexItem />
      <RightSection />
    </Paper>
  );
};

export default Profile;
