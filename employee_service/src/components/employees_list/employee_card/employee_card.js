import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 140,
  },
  cardContent: {
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.grey['900'],
  },
}));

const EmployeeCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={'/profile'} className={classes.link}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://place-hold.it/128/333"
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              -MR-
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Жмых Петрович
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default EmployeeCard;
