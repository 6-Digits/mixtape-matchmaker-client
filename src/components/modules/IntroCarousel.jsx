import React, { useState, createRef, useEffect} from "react";
import Carousel from 'react-material-ui-carousel';
import {makeStyles, Button, Grid, Avatar, Typography} from '@material-ui/core';
// Images all taken from Unsplash. License Free
import headphones from "../../assets/headphones.jpg";
import share from "../../assets/share.jpg";
import connect from "../../assets/connect.jpg";
import rings from "../../assets/rings.jpg";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme)=>({
	carousel: {
		width: "100%",
		zIndex: 500
	},
	item: {
		height: "100%",
		margin: "auto",
	},
	headphones: {
		backgroundImage: `url(${headphones})`, 
		backgroundPosition: 'center',
		backgroundSize: "cover",
		objectFit: 'contain',
		position: 'absolute',
		top: 0
	},
	share: {
		backgroundImage: `url(${share})`, 
		backgroundPosition: 'center',
		backgroundSize: "cover",
		objectFit: 'contain',
		position: 'absolute',
		top: 0

	},
	container: {
		height: "100%"
	},
	connect: {
		backgroundImage: `url(${connect})`, 
		backgroundPosition: 'center',
		backgroundSize: "cover",
		objectFit: 'contain',
		position: 'absolute',
		top: 0
	},
	mm:{
		backgroundImage: `url(${rings})`, 
		backgroundPosition: 'center',
		backgroundSize: "cover",
		objectFit: 'contain',
		position: 'absolute',
		top: 0
	},
	button: {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper
	}
}));

function IntroCarousel({screenWidth}){
	const [carouselIndex, setCarouselIndex] = useState(0);
	const containerRef = createRef();
	const [containerHeight, setContainerHeight] = useState("100%");

	useEffect(() => {
		// STYLE THE BUTTON SO THE SIZE WILL BE ADAPTIVE
		if(containerRef.current){
			setContainerHeight(containerRef.current.offsetHeight);
		}

	})
	
	const onAnimate = (index) => {
		setCarouselIndex(index);
	}

	const classes = useStyles();
	return (
		<Grid container className={classes.container} alignItems="center" ref={containerRef}>
			<Carousel
			interval={5000}
			animatiom="slide"
			timeout={750}
			className={classes.carousel}
			onChange={onAnimate}
			navButtonsAlwaysVisible={true}>
				<Grid direction="column" container justify="center" alignItems="center" >
					<Typography variant={screenWidth > 900 ? 'h1' : screenWidth > 600 ? 'h2' : 'h3'}>{"Listen"}</Typography>
				</Grid> 
				<Grid direction="column" container justify="center" alignItems="center" >
					<Typography variant={screenWidth > 900 ? 'h1' : screenWidth > 600 ? 'h2' : 'h3'}>{"Share"}</Typography>
				</Grid> 
				<Grid direction="column" container justify="center" alignItems="center" >
					<Typography variant={screenWidth > 900 ? 'h1' : screenWidth > 600 ? 'h2' : 'h3'}>{"Connect"}</Typography>
				</Grid> 
				<Grid direction="row" container justify="center" alignItems="center" >
					<Grid item xs={12} container justify="center" alignItems="center">
						<Avatar variant="square" src={logo} className={classes.logo} style={{
							width: screenWidth > 900 ? '20rem' : screenWidth > 600 ? '10rem' : '5rem', 
							height: screenWidth > 900 ? '30rem' : screenWidth > 600 ? '15rem' : '7.5rem'
						}}></Avatar>
					</Grid>

					<Grid item xs={12} container justify="center" alignItems="center">
						<Typography variant={screenWidth > 900 ? 'h1' : screenWidth > 600 ? 'h4' : 'h5'}>{"Mixtape Matchmaker"}</Typography>
					</Grid>
					
					<Grid item xs={12} container justify="center" alignItems="center">
						<Typography variant={screenWidth > 900 ? 'h3' : screenWidth > 600 ? 'h5' : 'h6'}>{"Make More Memories"}</Typography>
					</Grid>
					
					<Grid item xs={12} container justify="center" alignItems="center">
						<Button href="/about" variant="contained" className={classes.button}>{"Learn more"}</Button>
					</Grid>
				</Grid> 
			</Carousel>
			{
				carouselIndex === 0 ?
				<div className={classes.headphones} style={{
					height: containerHeight,
					width: screenWidth > 900 ? `${(8/12) * 100}%` : `${(6/12) * 100}%`
				}}></div> : null
			}
			{
				carouselIndex === 1 ?
				<div className={classes.share} style={{
					height: containerHeight,
					width: screenWidth > 900 ? `${(8/12) * 100}%` : `${(6/12) * 100}%`
				}}></div> : null
			}
			{
				carouselIndex === 2 ?
				<div className={classes.connect} style={{
					height: containerHeight,
					width: screenWidth > 900 ? `${(8/12) * 100}%` : `${(6/12) * 100}%`
				}}></div> : null
			}
			{
				carouselIndex === 3 ?
				<div className={classes.mm} style={{
					height: containerHeight,
					width: screenWidth > 900 ? `${(8/12) * 100}%` : `${(6/12) * 100}%`
				}}></div> : null
			}
		</Grid>
		
	)
}

export default IntroCarousel;