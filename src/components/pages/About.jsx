import { useHistory } from "react-router-dom";
import React, { useState, useEffect }  from "react";
import {  makeStyles, Button, IconButton } from "@material-ui/core"
import { Grid } from "@material-ui/core";
import logo from "../../assets/logo.png";
import darren from "../../assets/darren_profile.png";
import farhan from "../../assets/farhan_profile.jpg";
import jason from "../../assets/jason_profile.jpg";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme)=>({
    bold: {
        fontWeight: "bold"
	},
	content: {
		padding: '1rem',
		display: "flex",
		alignItems: "center",
		backgroundColor: theme.palette.background.paper
	},
	button: {
		fontWeight: "bold"
	},
	buttonGrid: {
		// height: '100%'
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
	},
	footer: {
		padding: '1rem',
		backgroundColor: theme.palette.background.default
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
		<div className={classes.container}>
			{/* <Sidebar pageName='About'></Sidebar> */}
			<Grid container direction="row" justify="center" alignItems="center" className={classes.content}>
				<Grid item container xs={width > 900 ? 8 : width > 300 ? 6 : 4} justify="flex-start" alignItems="center">
					<div style={{fontSize: width > 900 ? '8rem' : width > 300 ? '3rem' : '2rem'}}>
						About
					</div>
				</Grid>
				<Grid item container xs={width > 900 ? 4 : width > 300 ? 6 : 8} justify="flex-end" alignItems="center" className={classes.buttonGrid}>
					<Button 
						style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}
						onClick={history.goBack} 
						className={classes.button}
						variant="contained"
						color="secondary"
						>Back to Previous Page</Button>
				</Grid>
				<Grid item container xs={width > 900 ? 8 : width > 300 ? 6 : 4}>
					<div style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}>
						You are a normal human-being trying to either make some new friends or get yourself known to the world. You want to meet that special person that shares the same musical interest as you, but you have no way of doing that other than to go on SoundCloud / Youtube / Spotify / Pandora, find a playlist and try to go through the arduous process of finding out the person’s social media profiles so you could contact them privately. This process is tedious and time consuming, thus, our Mixtape Matchmaker provides a platform that allows people to connect with each other in this exact way. 
					</div>
				</Grid>
				<Grid item container xs={width > 900 ? 4 : width > 300 ? 6 : 8}>	
					<img src={logo} className={classes.logo} alt="" style={{
						height: width > 900 ? '30rem' : width > 600 ? '20rem' : '15rem',
						width: width > 900 ? '20rem' : width > 600 ? '15rem' : '10rem'
					}}/>
				</Grid>
				<Grid item container xs={12} justify="flex-start" alignItems="center">
					<div style={{fontSize: width > 900 ? '8rem' : width > 300 ? '3rem' : '2rem'}}>
						Developers
					</div>
				</Grid>
				{/* Farhan's Box */}
				<Grid item container xs={4} justify="center" alignItems="center">
					{/* Picture */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<img src={farhan} className={classes.logo} alt=""  style={{
						height: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem',
						width: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem'
					}}/>
					</Grid>
					{/* Name */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<div style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}>
							Farhan Ahmed
						</div>
					</Grid>
					{/* Links */}
					<Grid item container justify="center" alignItems="center" xs={width > 900 ? 6 : width > 300 ? 8 : 12}> 
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://www.linkedin.com/in/f4str/"
							>
								<LinkedInIcon/>
							</IconButton>
						</Grid>
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://github.com/f4str"
							>
								<GitHubIcon/>
							</IconButton>
						</Grid>
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://f4str.github.io/"
							>
								<LanguageIcon/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				{/* Jason's Box */}
				<Grid item container xs={4} justify="center" alignItems="center">
					{/* Picture */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<img src={jason} className={classes.logo} alt=""  style={{
						height: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem',
						width: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem'
					}}/>
					</Grid>
					{/* Name */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<div style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}>
							Jason Huang
						</div>
					</Grid>
					{/* Links */}
					<Grid item container justify="center" alignItems="center" xs={width > 900 ? 6 : width > 300 ? 8 : 12}> 
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://www.linkedin.com/in/jhuang6625/"
							>
								<LinkedInIcon/>
							</IconButton>
						</Grid>
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://github.com/thefireblade"
							>
								<GitHubIcon/>
							</IconButton>
						</Grid>
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://jasonhuang.web.app/"
							>
								<LanguageIcon/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				{/* Darren's Box */}
				<Grid item container xs={4} justify="center" alignItems="center">
					{/* Picture */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<img src={darren} className={classes.logo} alt=""  style={{
						height: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem',
						width: width > 900 ? '20rem' : width > 600 ? '11.25rem' : '7.5rem'
					}}/>
					</Grid>
					{/* Name */}
					<Grid item container justify="center" alignItems="center" xs={12}>
						<div style={{fontSize: width > 900 ? '2rem' : width > 300 ? '1rem' : '0.75rem'}}>
							Darren Kong
						</div>
					</Grid>
					{/* Links */}
					<Grid item container justify="center" alignItems="center" xs={width > 900 ? 6 : width > 300 ? 8 : 12}> 
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://www.linkedin.com/in/darren-kong-5b258b185/"
							>
								<LinkedInIcon/>
							</IconButton>
						</Grid>
						<Grid item container justify="center" alignItems="center" xs={4}>
							<IconButton
								className={classes.button}
								target="_blank"
								href="https://github.com/kong0716"
							>
								<GitHubIcon/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid container justify="center" alignItems="center" xs={12} className={classes.footer}>
				<div style={{fontSize: width > 900 ? '1rem' : width > 300 ? '0.75rem' : '0.5rem'}}>
								Copyright © 2021 - Developed by Farhan Ahmed, Jason Huang, and Darren Kong. 
							</div>
			</Grid>
		</div>
	);
}

export default About;