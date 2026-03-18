# Tarkov Battle Buddy

**Cross Platform Mobile App for Android and Ios**

## The Purpose
This application is being created as a companion app for the game *Escape from Tarkov* developed by *BattleState Games*. 

The app is meant to provide a convenient/all in one solution to flattening Tarkov's intimidating learning curve while also providing useful utility for experienced players.

The user will be able to:
- view maps for the game
- check ammunition stats (damage, armor penetration)
- lookup items and prices for the in game market
- get help with quests
- **and more**

## Tech Stack
This app is being developed using **React Native** along with the **Expo** bundler. I opted for **TypeScript** rather than Js for this project as it should be more maintainable and safer to scale.

The data presented by the application is primarily obtained from the [Tarkov.dev](https://tarkov.dev/api/) open source API. This is a **GraphQL** API that I fetch data from to use throughout the application.

## Planned Features
- Account creation and user authentication
- Integrate with the Tarkov.dev api for fetching data
- Maps screen for help navigating the various maps
- Item lookup screen
- Quest help screen

More will be added as I get further in development.

## Todo:
- ~~Improve functionality for loading fonts (create loading screen and await font loading)~~
- ~~Add item search screen for looking up items~~
- ~~Add item details screen to expand selected item from search~~
- Add map selection screen to choose a map for viewing
- Add individual maps and create a map view screen
- Add ammunition screen for ballistics info
- Create scatter plots for each caliber of ammunition (will be toggled on ammunition screen)
- Create login screen and start on auth
- ~~Add item search functionality with graphql tarkov.dev api~~

## Try it Yourself
If you have node.js installed on your system, you can run this project on a phone emulator or an actual device

1. Clone this github repo to a place of your choosing (in terminal run: `git clone https://github.com/Shmolty/tarkov-battle-buddy`)
2. in a terminal of your choice run `npm install` to install all of the necessary modules / dependencies
3. after that is done, run `npm start` or `expo npx start` and run the app on the device of your choosing (to run it on an actual device you will have to install the expo go application. emulators such as android studio do this automatically)