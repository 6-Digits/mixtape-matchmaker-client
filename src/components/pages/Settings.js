import React, { useState, useEffect } from "react";
import Sidebar from '../navbar/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Settings(props) {
	return (
		<div>
			<Sidebar pageName='Settings'></Sidebar>
			<CssBaseline />
      		<Container maxWidth="large">
        		<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
				<Typography variant="h1" component="h2" gutterBottom>
        			h1. Heading
				</Typography>
      		</Container>
		</div>
	);
}

export default Settings;