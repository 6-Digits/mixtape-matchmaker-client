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
        zIndex: 9999
    },
    item: {
        height: "100vh",
        margin: "auto",
    },
    headphones: {
        backgroundImage: `url(${headphones})`, 
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: "100%",
        width: `${(8/12) * 100}%`,
        position: 'absolute',
        top: 0
    },
    share: {
        backgroundImage: `url(${share})`, 
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: "100%",
        width: `${(8/12) * 100}%`,
        position: 'absolute',
        top: 0

    },
    container: {
    },
    connect: {
        backgroundImage: `url(${connect})`, 
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: "100%",
        width: `${(8/12) * 100}%`,
        position: 'absolute',
        top: 0
    },
    mm:{
        backgroundImage: `url(${rings})`, 
        backgroundPosition: 'center',
        backgroundSize: "cover",
        width: `${(8/12) * 100}%`,
        height: "100%",
        position: 'absolute',
        top: 0
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
    const [carouselIndex, setCarouselIndex] = useState(0);

    const onAnimate = (index, active) => {
        setCarouselIndex(index);
    }

	const classes = useStyles();
    return (
        <Grid container className={classes.container} alignItems="center" 
            // style={
            //     {
            //         backgroundImage: `url(${image})`, 
            //         backgroundPosition: 'center',
            //         backgroundSize: "cover"
            //     }
            //     }
            >
            <Carousel
            interval={3000}
            animatiom="slide"
            timeout={750}
            className={classes.carousel}
            onChange={onAnimate}
            navButtonsAlwaysVisible={true}>
                <Grid direction="column" container justify="center" alignItems="center" >
                    <Typography variant="h1">{"Listen"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" >
                    <Typography variant="h1">{"Share"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" >
                    <Typography variant="h1">{"Connect"}</Typography>
                </Grid> 
                <Grid direction="column" container justify="center" alignItems="center" >
                    <Avatar variant="square" src={logo} className={classes.logo}></Avatar>
                    <Typography variant="h1">{"Mixtape Matchmaker"}</Typography>
                    <Typography variant="h3">{"Make More Memories"}</Typography>
                    <Button href="/about" variant="contained" className={classes.button}>{"Learn more"}</Button>
                </Grid> 
            </Carousel>
            {
                carouselIndex === 0 ?
                <div className={classes.headphones}></div> : null
            }
            {
                carouselIndex === 1 ?
                <div className={classes.share}></div> : null
            }
            {
                carouselIndex === 2 ?
                <div className={classes.connect}></div> : null
            }
            {
                carouselIndex === 3 ?
                <div className={classes.mm}></div> : null
            }
        </Grid>
        
    )
}

export default IntroCarousel;