import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabLayout from './tab_layout/tab_layout';
import AdvancedSearchTab from './advanced_search_tab/advanced_search_tab';
import DefaultSearchTab from './default_search_tab/default_search_tab';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '100px auto',
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="DEFAULT SEARCH" {...a11yProps(0)} />
          <Tab label="ADVANCED SEARCH" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabLayout value={value} index={0} dir={theme.direction}>
          <DefaultSearchTab />
        </TabLayout>
        <TabLayout value={value} index={1} dir={theme.direction}>
          <AdvancedSearchTab />
        </TabLayout>
      </SwipeableViews>
    </div>
  );
};

export default Home;
