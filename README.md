# Mixtape Matchmaker

<img src="src/assets/logo.png" width="200">

## Description

Mixtape Matchmaker is a website where you are able to create customizable playlists full of any songs of your choice. You can choose to keep your playlists private or publicly share them with others. Alternatively, instead of creating playlists, you can view the public playlists of other users. Like, comment, and share playlists you find interesting. 

However, the main function of the website is the ability to match with other users. Using state-of-the-art machine learning algorithms, you are matched with people with similar musical tastes. You can choose to either like or dislike the people you are matched with. If the person you like does like you back, you can initiate a live chat with them. Connect with people throughout the world who enjoy the same music as you.


## Requirements

* NodeJS and npm
	- On Ubuntu 
	```bash
	$ sudo apt update
	$ sudo apt install nodejs
	```
	- On Mac
	```
	$ brew update
	$ brew install node
	```
	- On Windows, go to https://nodejs.org/en/download/
* Ports 4000, 5000, 8080, and 42069 allowed on firewall
* A web browser, Chrome-based preferred

## Installation

Clone the repository
```bash
$ git clone https://github.com/6-Digits/mixtape-matchmaker.git
```
Change directories into the folder
```bash
$ cd mixtape-matchmaker
```
You will need two terminals, one for the server and one for the client.

### Starting the server
Using of the terminals change directories to the `server` folder
```bash
$ cd server
```
Install the dependencies using npm
```bash
$ npm install
```
Start the server
```bash
$ npm start
```
The server will be started on port http://localhost:42069. The server will need to be running in order for the client to work. 

### Starting the client
Using the other terminal change directories to the `client` folder
```bash
$ cd client
```
Install the dependencies using npm
```bash
$ npm install
```
Start the client
```bash
$ npm start
```
The client will be started on port http://localhost:8080. This is what will be used to access the website.  

## Notes

Please make sure to read the following notes about website to clarify potential misconceptions avoid any issues. 

### Matching Algorithm

The matching algorithm runs every two minutes in the background and will try to find any other users that you can match with. You can view your current match list of potential matches by clicking the "Go Match" button on the "Matches" page of the website. You will only receive new matches when you have exhausted the current match list. Therefore, to match with new people either:

1. Manually clear you match list by liking or disliking everyone until there are no more candidates
2. Edit your match preferences and save. This will automatically clear your match list

The matching algorithm will only find new matches for users with an empty match list. Therefore, if you cannot find the user you wish to match with, try clearing your match list using one of the two methods above and wait about two minutes for the algorithm to find new matches for you. 

When liking another user's profile after matching with them, the other user must like you back in order to create a chat with them. When both users have matched and liked each other, please allow up to one minute for the chat to be created. 

### Google API

The website heavily utilizes many of Google's APIs such as YouTube, Maps, and Gmail. There have recently been many disruptions on Google's servers which may cause some of the services on the site to fail. If you encounter a problem, please first visit https://downdetector.com/status/google/ to check if it is a problem with Google and not the website. 

### Preloaded Accounts

TAs are able to access some preloaded accounts if they want. 
```
username: dummy[n]@test.com
password: 123456789
```
for n = 0, 1, 2, ...,10. Ex: dummy0@test.com, dummy1@test.com, etc.
