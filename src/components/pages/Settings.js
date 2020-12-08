import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, ButtonBase, TextField, List, ListItem, ListItemText, Menu, MenuItem, Switch, Button, FormControlLabel, Card, CardMedia } from '@material-ui/core';
import NavigationBar from '../modules/NavigationBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import placeholder from "../../assets/placeholder.png";
import {storage} from "../frameworks/Firebase";

const options = [
	{title: "Male"}, 
	{title: "Female"},
	{title: "Other" }
];

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		marginTop: "0.5rem",
		padding: '0 0 0 1rem',
		borderRadius: "0",
		display: "flex",
		justifyContent: "auto",
		width: "100%",
	},
	paperCard: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.default,
	},
	card: {
		maxWidth: 300,
		maxHeight: 300,
		margin: theme.spacing(2),
	},
	cardMedia: {
		maxHeight: 265,
	},
	cardContent: {
		textAlign: "left",
	},
	cardAction: {
		display: 'block',
		maxWidth: 300,
		maxHeight: 300,
	},
	container: {
		width: "100%"
	},
	button: {
		fontWeight: 'bold',
		width: "100%"
	},
	name: {
		width:'100%'
	},
	genderDate: {
		marginTop: "0.5rem"	,
		marginBottom: "0.5rem"	
	},
	saveError: {
		color: theme.palette.error.main,
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	},
	success: {
		color: theme.palette.success.main,
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	}
}));

const errorNoPassMatch = "The passwords that you have enter do not match!";
const errorCannotFetchData = "We cannot fetch the data from our database likely because you are not connected to the internet!";
const errorSignUp = "We could not update your account settings. Either the password is incorrect or the server is down. Please try again or contact support!";
const errorInvalidEmail = "The email that you have entered is not valid!";
const errorShortPass = "The password that you have entered should be at least 8 characters long!";
const errorNoChange = "No fields were changed!";
const errorMissing = "One or more of the fields above are empty!";
const errorAge = "You have to be at least 18 years of age or older to register";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const api = 'http://localhost:42069/api';

function Settings(props) {
	let prevDisplayName = null;
	let prevName = null;
	let prevBirthDate = null;
	let prevGender = null;
	const [prevImg, setPrevImg] = useState(null);
	const [success, setSuccess] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [imgFile, setImgFile] = useState(0);
	const [displayName, setDisplayName] = useState(" ");
	const [name, setName] = useState("Adam");
	const [birthdate, setBirthdate] = useState("");
	const [gender, setGender] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPass, setConfirmPass] = useState(null);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [imgSrc, setImgSrc] = useState(null);
	const [allowNotifications, setAllowNotifications] = useState(null);
	const [oldPassword, setOldPassword] = useState(null);
	const [state, setState] = useState({
		checkedNotifications: true,
	});


	const fetchUserProfile = async (userToken, user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(api + `/profile/id/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			setName(data['name']); 
			prevName = data['name'];
			setDisplayName(data['userName']);
			prevDisplayName = data['userName'];
			setBirthdate(data['dob'].substring(0, 10));
			prevBirthDate = data['dob'].substring(0,10);
			setEmail(props.user.email);
			setImgSrc(data['imgSrc']);
			setPrevImg(data['imgSrc']);
			setAllowNotifications(user.allowNotifications);
			options.forEach((genderOption, index) => {
				if(data['gender'].toLowerCase() === genderOption['title'].toLowerCase()) {
					setGender(genderOption);
				}
			});
			prevGender = data['gender'];
		} else {
			setError(true);
			setErrorMsg(errorCannotFetchData);
		}
	};

	function getAge(dateString) {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	const saveUserSettings = async () => {
		if(!props.user) {
			setError(true);
			setErrorMsg(errorSignUp);
			return null;
		}
		let validEmail = emailRegex.test(String(email).toLowerCase());
		let valid = true;
		if(!validEmail) {
			valid=false;
			setError(true);
			setErrorMsg(errorInvalidEmail);
		} else if(password) {
			if(password.length < 8){
				valid=false;
				setError(true);
				setErrorMsg(errorShortPass);
			} else if(password != confirmPass) {
				valid=false;
				setError(true);
				setErrorMsg(errorNoPassMatch);
			}
		} else if(!name || !birthdate || !gender || !oldPassword || !displayName || !imgSrc) {
			valid=false;
			setError(true);
			setErrorMsg(errorMissing);
		} else if(getAge(birthdate) < 18) {
			valid = false
			setError(true);
			setErrorMsg(errorAge);
		} 
		if(valid){
			if(!imgFile) {
				let userData = {
					name:name,
					userName: displayName,
					dob: birthdate,
					gender: gender['title'],
					email: email,
					allowNotifications: allowNotifications,
					oldPassword: oldPassword,
					newPassword: password,
					imgSrc: prevImg
				};
				let requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json' },
					body: JSON.stringify(userData)
				};
				let response = await fetch(api + '/profile/uid/' + props.user._id, requestOptions);
				let data = await response.json();
				if (response.status === 200) {
					setSuccess(true);
				} else {
					setError(true);
					setErrorMsg(errorSignUp);
				}
			} else {
				let userImageRef = storage.ref(`${props.user._id}/images/`);
				userImageRef.listAll().then(function (result) {
					result.items.forEach(function (file) {
						file.delete();
					});
					let uploadTask = userImageRef.put(imgFile);
					uploadTask.on('state_changed', function(snapshot){
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						// var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						// console.log('Upload is ' + progress + '% done');
						// switch (snapshot.state) {
						//   case firebase.storage.TaskState.PAUSED: // or 'paused'
						// 	console.log('Upload is paused');
						// 	break;
						//   case firebase.storage.TaskState.RUNNING: // or 'running'
						// 	console.log('Upload is running');
						// 	break;
						// }
						}, function(error) {
						// Handle unsuccessful uploads
						setError(true);
						setErrorMsg(error);
						}, function() {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
							let userData = {
								name:name,
								userName: displayName,
								dob: birthdate,
								gender: gender['title'],
								email: email,
								allowNotifications: allowNotifications,
								oldPassword: oldPassword,
								newPassword: password,
								imgSrc: downloadURL
							};
							let requestOptions = {
								method: 'POST',
								headers: {'Content-Type': 'application/json' },
								body: JSON.stringify(userData)
							};
							let response = await fetch(api + '/profile/uid/' + props.user._id, requestOptions);
							let data = await response.json();
							if (response.status === 200) {
								setSuccess(true);
							} else {
								setError(true);
								setErrorMsg(errorSignUp);
							}
						});
					});
				}).catch(err => {
					setError(true);
					setErrorMsg(err);
				});
			}
			// if(email != props.user.email || allowNotifications != props.user.allowNotifications || password) {
				// valid =true;
				// let userToken = localStorage.getItem('userToken');
				// let accountData = {
				// 	email: email,
				// 	allowNotifications: allowNotifications,
				// 	oldPassword: oldPassword,
				// }
				// if (password) {
				// 	alert('Password is changed')
				// 	accountData['password'] = password;
				// }
				// let requestOptions = {
				// 	method: 'POST',
				// 	headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
				// 	body: JSON.stringify(accountData)
				// };
				// let response = await fetch(api + `/account/id/${props.user._id}`, requestOptions);
				// let data = await response.json();
				// if (response.status === 200) {
				// 	setSuccess(true);
				// 	props.storeUser(data['token']);
				// 	props.setUser(data);
				// 	localStorage.setItem('user', JSON.stringify(data));		
				// } else {
				// 	setError(true);
				// 	setErrorMsg(errorSignUp);
				// }
			//}
			
		}
	}

	useEffect(() => {
		// let userToken = JSON.parse(cookies.get('userToken'));
		// let userToken = cookies['userToken'];
		let userToken = localStorage.getItem('userToken');
		if(userToken && props.user){
			fetchUserProfile(userToken, props.user);
		} 
	  }, []);

	const displayNameChange = (event) => {
		setDisplayName(event.target.value);
		setError(false);
		setSuccess(false);
	};

	const nameChange = (event) => {
		setName(event.target.value);
		setError(false);
		setSuccess(false);
	};
	const birthChange = (event) => {
		setBirthdate(event.target.value.substring(0, 10));
		setError(false);
		setSuccess(false);
	};

	const genderChange = (event, value) => {
		setGender(value);
		setError(false);
		setSuccess(false);
	};
	const emailChange = (event) => {
		setEmail(event.target.value);
		setError(false);
		setSuccess(false);
	};
	const passChange = (event) => {
		setPassword(event.target.value);
		setError(false);
		setSuccess(false);
	};
	const confirmPassChange = (event) => {
		setConfirmPass(event.target.value);
		setError(false);
		setSuccess(false);
	};
	const oldPasswordChange = (event) => {
		setOldPassword(event.target.value);
		setError(false);
		setSuccess(false);
	};
	const imgChange = (event) => {
		let selectedFile = event.target.files[0];
		setImgFile(selectedFile);
		let reader = new FileReader();
	  
		reader.onload = function(event) {
		  setImgSrc(event.target.result);
		  setError(false);
		  setSuccess(false);
		};
	  
		reader.readAsDataURL(selectedFile);
	};

	const handleChange = (event) => {
		setAllowNotifications(!allowNotifications);
		setError(false);
		setSuccess(false);
	};
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<NavigationBar setUser={props.setUser} user={props.user} notifications={props.notifications}pageName='My Settings'></NavigationBar>
			
			<Paper className={classes.paper}>
				<Grid container spacing={3} className={classes.mainContainer}>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Public Profile</Typography>
					</Grid>
					<Grid item xs={12} sm={3} alignItems="center">
						<Card className={classes.card}>
							<input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imgChange}/>
							<ButtonBase className={classes.cardAction}>
								<label htmlFor="icon-button-file">
									<CardMedia component='img' className={classes.cardMedia} image={imgSrc}/>
								</label>
							</ButtonBase>
						</Card>
					</Grid>
					<Grid item xs={12} sm={9} alignItems="center">
						<Paper className={classes.paperCard}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Display Name"
								name="username"
								value={displayName}
								onChange={displayNameChange}
								autoComplete="nickname"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								id="name"
								label="Name"
								name="Name"
								value={name}
								onChange={nameChange}
								autoComplete="name"
								className={classes.name}
							/>
							<Grid item xs={12} 
								direction="row" 
								justify="space-between" container alignItems="center"
								className={classes.genderDate}>
								<Grid item xs ={5}>
									<Typography gutterBottom variant="subtitle1">
										<form className={classes.container} noValidate>
											<TextField
												id="datetime-local"
												label="Birthday"
												type="date"
												required
												fullWidth
												value={birthdate}
												onChange={birthChange}
												className={classes.textField}
												InputLabelProps={{
													shrink: true,
												}}
											/>
										</form>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
									required
									id="combo-box-demo"
									options={options}
									getOptionLabel={(option) => option.title}
									autoComplete="sex"
									value={gender}
									renderInput={(params) => <TextField {...params} label="Gender *" variant="outlined" />}
									onChange={genderChange}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Account Settings</Typography>
					</Grid>
					<Grid item xs>
					<Paper className={classes.paperCard}>
						<TextField
							variant="outlined"
							margin="normal"
							defaultValue="currentEmail@domain.com"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							value={email}
							onChange={emailChange}
							autoComplete="email"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="password"
							label="New Password"
							name="password"
							type="password"
							value={password}
							onChange={passChange}
							autoComplete="password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="confirmPassword"
							label="Confirm New Password"
							name="confirmPassword"
							value={confirmPass}
							onChange={confirmPassChange}
							autoComplete="confirmPassword"
							type="password"
						/>
						<FormControlLabel
							control={
								<Switch 
									checked={state.checkedNotifications} 
									onChange={handleChange} 
									name="checkedNotifications" 
									checked={allowNotifications}
									/>
							}
							label="Allow Notifications" labelPlacement="start"
						/>
					</Paper>
					</Grid>
				<Grid item xs={12}>
					<Typography gutterBottom variant="h4">Confirm Changes</Typography>
				</Grid>
				<Grid item xs={12}>
				<Paper className={classes.paperCard}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="confirmOldPassword"
						label="Confirm Old Password"
						name="confirmOldPassword"
						type="password"
						autoComplete="confirmOldPassword"
						onChange={oldPasswordChange}
					/>
					</Paper>
				</Grid>
				<Grid item xs={12} fullWidth>
					<Button size="large" color="primary" variant="contained" className={classes.button} onClick={saveUserSettings}>Save Changes</Button>
				</Grid>
				<Grid item xs={12}>
				{error ? <div className={classes.saveError}>{errorMsg}</div> : null}
				{success ? <div className={classes.success}>Settings have been saved successfully!</div> : null}
				</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Settings;