import React, { useState} from "react";
import Carousel from 'react-material-ui-carousel';
import {Paper, makeStyles, Button, Grid, Avatar, Typography} from '@material-ui/core';
//Images all taken from Unsplash. License Free
import headphones from "../../assets/headphones.jpg";
import share from "../../assets/share.jpg";
import connect from "../../assets/connect.jpg";
import rings from "../../assets/rings.jpg";
import logo from "../../assets/logo.png";

 
const useStyles = makeStyles((theme)=>({
    carousel: {
        width: "100%",
    },
    item: {
        height: "100vh",
        margin: "auto",
    },
    headphones: {

    },
    share: {

    },
    container: {
    },
    connect: {

    },
    mm:{

    },
    logo: {
        width: "20rem",
        height: "30rem"
    },
    button: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper
    }
}));    
function IntroCarousel(props){
    const images = [headphones, share, connect, rings];
    const [image, setImage] = useState(headphones);

    const onAnimate = (index, active) => {
        setImage(images[index]);
    }

	const classes = useStyles();
    return (
        <Grid container className={classes.container} alignItems="center" 
            style={
                {
                    backgroundImage: `url(${image})`, 
                    backgroundPosition: 'center',
                    backgroundSize: "cover"
                }
                }>
            <Carousel
            interval={5000}
            animatiom="slide"
            timeout={750}
            className={classes.carousel}
            onChange={onAnimate}
            navButtonsAlwaysVisible={true}>
                <Grid direction="column" container justify="center" alignItems="center" className={classes.headphones}>
                    <Typography variant="h1">{"Listen"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" className={classes.share}>
                    <Typography variant="h1">{"Share"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" className={classes.connect}>
                    <Typography variant="h1">{"Connect"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" className={classes.mm}>
                    <Avatar variant="square" src={logo} className={classes.logo}></Avatar>
                    <Typography variant="h1">{"Mixtape Matchmaker"}</Typography>
                    <Typography variant="h3">{"Make More Memories"}</Typography>
                    <Button href="/about" variant="contained" className={classes.button}>{"Learn more"}</Button>
                </Grid> 
            </Carousel>
        </Grid>
        
    )
}

export default IntroCarousel;