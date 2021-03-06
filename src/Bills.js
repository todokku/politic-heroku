import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { Tab, Tabs, Grid } from '@material-ui/core'
import BillCard from './BillCard'
import Pol2 from './Pol2'
import { isBrowser } from "react-device-detect"

import { Info} from '@material-ui/icons'

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
    tab: 'Recent',
    fed: ''
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

  handlePol = (pol) => {
    if (pol === "Back") {
      this.setState({fed: ''})
    } else {
  this.setState({fed: pol})
  }
  }

  handleChange = (event, change) => {
    if (change === "Back") {
    //  this.props.handlePol("Back")
    } else {
    this.setState({
      tab: change
    })
  }
  }

  render() {
      const { classes } = this.props;
      let gridNum
      if (isBrowser) {
        gridNum = 3
      } else {
        gridNum = 12
      }
      const x = this.state.bills.map(bill => <Grid item xs={gridNum}> <BillCard bill={bill} handlePol={this.handlePol} /> </Grid>)

    return (
      <main className={classes.main}>
      { (this.state.fed.length === 0) ?
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
      <Tabs
        value={this.state.tab}
       onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >

        <Tab icon={<Info />} value={"Recent"} label="Recently Introduced" />

      </Tabs>
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {x}
      </Grid>
      </Grid>
      </Paper>
      :
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
      <Pol2 id={this.state.fed} handlePol={this.handlePol}/>
      </Paper>
    }
      </main>
    )
  }
}

Bills.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bills);
