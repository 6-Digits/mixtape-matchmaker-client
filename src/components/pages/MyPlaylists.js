import React, { useState, useEffect } from "react";
import Sidebar from '../navbar/Sidebar';

function MyPlaylists(props) {
	return (
		<div>
			<Sidebar pageName='My Playlists'></Sidebar>
		</div>
	);
}

export default MyPlaylists;