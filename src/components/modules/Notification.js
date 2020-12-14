import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Collapse, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  message : {
    overflowX: 'auto',
    width: '100%'
  },
  container :{
    width: '100%',
    height: '100%'
  }
}));

export default function Notification(props) {
  const classes = useStyles();
  const [open] = React.useState(true);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
          <Grid container justify="center" alignItems="center" className={classes.container}>
            <Grid item xs={2} container justify="center" alignItems="center">
              <NotificationsActiveIcon/>
            </Grid>
            <Grid item xs={8} container justify="center" alignItems="center">
              <div className={classes.message}>{props.message}</div>
            </Grid>
            <Grid item xs={2} container justify="center" alignItems="center">
              <IconButton
                  aria-label="close"
                  color="inherit"
                  size="large"
                  onClick={() => {
                    props.onDelete();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Grid>
          </Grid>
      </Collapse>
    </div>
  );
}