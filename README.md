# React Nutshell: "fōlô"

A [Nashville Software School C38](https://github.com/nss-day-cohort-38) group project by:
- [Kurt Krafft](https://github.com/kurtkrafft1)
- [Landon Morgan](https://github.com/Iandonmorgan)
- [Matt Crook](https://github.com/MattCrook)
- [Keith Potempa](https://github.com/divinerankzero)

## Setup

Steps to get started:
1. `git clone git@github.com:nss-day-cohort-38/react-nutshell-the-magenta-phobias.git`
1. `cd` into the directory it creates
1. `mkdir api`
1. Download [this dummy json database](https://github.com/keithrpotempa/dummy-data-react-nutshell/blob/master/database.json) and place it in the api folder
1. `npm install` to build dependencies
1. `npm start` to run the app in the development mode
1. `json-server -p 8200 -w api/database.json`
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Overview

In this site, users can engage with several different apps:
* Home (Kurt): displays the events of users you follow
* News (Landon): to add, edit, and delete news articles; view news posted by users you have followed
* Chat (Keith): to post and edit messages; follow users
* Events (Kurt): to add, edit, and delete events
* Followings (Keith): to follow and unfollow users
* Tasks (Matt): to add, edit, delete and 'mark complete' user tasks
* Create User (Kurt): to create a new account (*)
* Login (Matt): to login to an existing account (*)

(*) **Note: this is not true authentication.** Passwords are saved in clear text on the JSON database. Do not use any sensitive information. 

## Technologies Used

This project utilizes the following:
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [Semantic UI](https://semantic-ui.com/) for buttons, icons, data-tooltips
* [React Burger Menu](https://github.com/negomi/react-burger-menu) for the 'burger' nav menu
* [React Confirm Alert](https://www.npmjs.com/package/react-confirm-alert) for confirm alerts
* [React Router](https://reacttraining.com/react-router/) for page routing

## Skills Utilized

We utilized all skills and concepts learned up to this point in our time here at NSS, including:

1. React: hooks, state, props, routes
1. API calls with: POST, PUT, PATCH, DELETE, and GET (with expand, embed)
1. Javascript: functions, objects, arrays, mapping
1. Persistent data storage with JSON Server
1. Github Scrum workflow
1. CSS styling
1. Modular code
1. Semantic HTML
1. [Valid HTML5](https://validator.w3.org/)

## Database Diagram 
![nutshell database](./ReactNutshellERD.png)