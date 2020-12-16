import { Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
import { Box, makeStyles, Button } from "@material-ui/core"
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme)=>({
    footer: {
        position: 'fixed',
        borderRadius: "10px 10px 0px 0px",
        left: "10%",
        bottom: "0px",
        width: "80%",
        padding: theme.spacing(2, 2, 2)
    },
    bold: {
        fontWeight: "bold"
	},
	content: {
		display: "flex",
		alignItems: "center",
		height: "60vh" ,
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
		margin: "auto",
		height: "40vh",
		width: "40vh"
	},
	container: {
		height: "100vh"
	}
}));

function About() {
	const classes = useStyles();
	const history = useHistory();
	
	return (
		<div>
			{/* <Sidebar pageName='About'></Sidebar> */}
			<Container component="main" maxWidth="lg" className={classes.container}>
				<Box className={classes.content}>
					<div>
						<Typography variant="h2">
							About
						</Typography>
						<Typography variant="h5">
							You are a normal human-being trying to either make some new friends or get yourself known to the world. You want to meet that special person that shares the same musical interest as you, but you have no way of doing that other than to go on SoundCloud / Youtube / Spotify / Pandora, find a playlist and try to go through the arduous process of finding out the person’s social media profiles so you could contact them privately. This process is tedious and time consuming, thus, our Mixtape Matchmaker provides a platform that allows people to connect with each other in this exact way. 
						</Typography>
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
					<img src={logo} className={classes.logo} alt="" />
				</Box>
			</Container>
		</div>
	);
}

export default About;