import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Collapse, Link } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  message : {
    overflowX: 'auto',
    width: '17rem'
  }
}));

export default function Notification(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert color='info'
          action={
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
          }
        >
          <div className={classes.message}>{props.message}</div>
        </Alert>
      </Collapse>
    </div>
  );
}