import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

const logoStyle = {
    margin: '10px'
};

class Header extends Component{

  componentDidMount(){
    // $(function () {
    //   $('[data-toggle="popover"]').popover()
    // })
  }

  getButtonText(state){
    console.log("get button text");
    console.log(state);
    if(state === 'core'){
      return 'Predict Risks'
    }
    else{
      return 'Go Home'
    }
  }
  render(){
    const { classes } = this.props;
    console.log("Header");
    console.log(this.props);
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <ThreeSixtyIcon className={classes.icon} style={logoStyle}/>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Regression 360
            </Typography>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.changeView}>
              {this.getButtonText(this.props.displayState)}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);