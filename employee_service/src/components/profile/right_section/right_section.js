import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 16,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

const RightSection = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <li>
        <Typography color="textSecondary" display="block" variant="subtitle1">
          General
        </Typography>
        <Divider component="li" />
      </li>
      <ListItem>
        <ListItemText primary="Department" secondary="Web & Mobile" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Room" secondary="1404" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Date of employment" secondary="04.03.2020" />
      </ListItem>
      <li>
        <Typography color="textSecondary" display="block" variant="subtitle1">
          Contacts
        </Typography>
        <Divider component="li" />
      </li>
      <ListItem>
        <ListItemText
          primary="Mobile"
          secondary={
            <Link href="tel:+375333077428" variant="body2">
              +375333077428
            </Link>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Mail"
          secondary={
            <Link
              href="mailto:vladzislau.ustsinovich@leverx.com"
              variant="body2"
            >
              vladzislau.ustsinovich@leverx.com
            </Link>
          }
        />
      </ListItem>
    </List>
  );
};

export default RightSection;
