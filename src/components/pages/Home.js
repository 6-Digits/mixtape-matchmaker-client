import React, { useState, useEffect } from "react";
import Sidebar from '../navbar/Sidebar';

function Home(props) {
	return (
		<div>
			<Sidebar pageName='Home'></Sidebar>
		</div>
	);
}

export default Home;