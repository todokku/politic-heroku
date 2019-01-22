import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { Tab, Tabs, Grid } from '@material-ui/core'
import BillCard from './BillCard'

import { KeyboardBackspace, Info, LineWeight } from '@material-ui/icons'

const styles = (theme) => ({

    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  card: {
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8
  },
  media: {
    height: 200,
  },


});

class Bills extends Component {

  state = {
    bills : [],
    tab: 'Recent'
  }

  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/116/both/bills/introduced.json',{
      headers: {
        Accept: "application/json",
        'X-API-KEY': process.env.REACT_APP_PROPUB_API_KEY
      }
    }).then(r => r.json())
    .then(bills => this.setState({bills: bills.results[0].bills}))
  }
  render() {
      console.log(this.state)
      const { classes } = this.props;
      const x = this.state.bills.map(bill => <Grid item xs={3}> <BillCard bill={bill} /> </Grid>)
    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>
      <Tabs
        value={this.state.tab}
    //   onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<KeyboardBackspace />} value={"Back"} label="Back" />
        <Tab icon={<Info />} value={"Recent"} label="Recent" />
        <Tab icon={<LineWeight />} value={"News"} label="News" />

      </Tabs>
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {x}
      </Grid>
      </Grid>
      </Paper>
      </main>
    )
  }
}

Bills.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bills);
