import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect }  from "react";
import { Box, makeStyles, Button } from "@material-ui/core"
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme)=>({
    bold: {
        fontWeight: "bold"
	},
	content: {
		display: "flex",
		alignItems: "center",
		height: "100%" ,
	},
	button: {
		fontWeight: "bold",
		marginTop: "30px"
	},
	center: {
		display: "flex",
		alignItems: "center"
	},
	logo: {
		display: "block",
		margin: "auto"
	},
	container: {
		height: "100%",
		backgroundColor: theme.palette.background.paper
	}
}));

function About() {
	const classes = useStyles();
	const history = useHistory();
	const [width, setWidth] = useState(0);

	
	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	}, []);
	
	return (
		<div>
			{/* <Sidebar pageName='About'></Sidebar> */}
			<Container component="main" maxWidth="lg" className={classes.container}>
				<Box className={classes.content}>
					<div>
						<div style={{fontSize: width > 900 ? '8rem' : width > 300 ? '3rem' : '2rem'}}>
							About
						</div>
						<div style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}>
							You are a normal human-being trying to either make some new friends or get yourself known to the world. You want to meet that special person that shares the same musical interest as you, but you have no way of doing that other than to go on SoundCloud / Youtube / Spotify / Pandora, find a playlist and try to go through the arduous process of finding out the person’s social media profiles so you could contact them privately. This process is tedious and time consuming, thus, our Mixtape Matchmaker provides a platform that allows people to connect with each other in this exact way. 
						</div>
						<div style={{fontSize: width > 900 ? '1rem' : width > 300 ? '0.75rem' : '0.5rem'}}>
							Copyright © 2020 - Developed by Farhan Ahmed, Jason Huang, and Darren Kong. 
						</div>
						<div className={classes.center}>
							<Button 
								onClick={history.goBack} 
								className={classes.button}
								variant="contained"
								size="large"
								color="primary"
								>Back to Previous Page</Button>
						</div>
					</div>
					<img src={logo} className={classes.logo} alt="" style={{
						height: width > 900 ? '30rem' : width > 600 ? '20rem' : '15rem',
						width: width > 900 ? '20rem' : width > 600 ? '15rem' : '10rem'
					}}/>
				</Box>
			</Container>
		</div>
	);
}

export default About;