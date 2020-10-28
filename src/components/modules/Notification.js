import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
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
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Link component='a' href={props.link}>{props.message}</Link>
        </Alert>
      </Collapse>
    </div>
  );
}