import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button, TextField, Popper, Fade, ClickAwayListener, Paper, Grid } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import {Share as ShareIcon } from '@material-ui/icons';
import {writeText} from "clipboard-polyfill/text";


const useStyles = makeStyles((theme) => ({
	popper: {
        width: "30%",
        zIndex: "9999!important"
    },
    shareContent: {
        padding: "1rem 1rem 1rem 1rem"

    },
    shareTextField: {
        width: "70%"
    },
    copyButton: {
        width: "30%"
    }
}));
const api = window.location.protocol+'//'+window.location.hostname+':42069/api';

function ShareDropDown({contentLink}) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
    const textFieldRef = useRef(null);
    const anchorRef = useRef(null);
    const [copyText, setCopyText] = useState("Copy");
    const [copied, setCopied] = useState(false);
    const id = "customized-menu";
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
    };
    
    
  const copyToClipboard = (e) => {
    setCopied(true);
    writeText(contentLink).then(()=> {
        setCopyText('Copied!');
        setTimeout(function () {
            setCopyText('Copy');
            setCopied(false);
        }, 1000);
    }).catch(()=>{
        setCopyText('Copy failed!');
        setTimeout(function () {
            setCopyText('Copy');
            setCopied(false);
        }, 1000);
    });
  };

	return (
		<div>
            <Button 
                ref={anchorRef}
				aria-describedby={id}
                aria-haspopup="true"
                variant="outlined">
                <ShareIcon
                    edge="end"
                    aria-label="Share"
                    aria-haspopup="true"
                    color="inherit"
                    fontSize='large'
                    onClick={handleClick}
                >
                </ShareIcon>
            </Button>
            <Popper className={classes.popper} id={id} open={open} 
				anchorEl={anchorRef.current} transition placement="bottom-end">
				{({ TransitionProps }) => (
					<Fade {...TransitionProps}>
						<Paper className={classes.shareContent}>
						<ClickAwayListener onClickAway={handleClose}>
                            <Grid container align="center">
                                <TextField 
                                label="Share" 
                                value={contentLink} 
                                className={classes.shareTextField}
                                disabled={true}>
                                </TextField>
                                <Button 
                                    className={classes.copyButton}
                                    color="primary" 
                                    disabled={copied} 
                                    onClick={copyToClipboard}>
                                    {copyText}
                                </Button>
                            </Grid>
						</ClickAwayListener>
						</Paper>
					</Fade>
				)}
			</Popper>
		</div>
	);
}

export default ShareDropDown;