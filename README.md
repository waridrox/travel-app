# Travel_App
## Features in the app
Allow the user to:
- remove the trip
- add notes for trip
- View image of country when city has no image on Pixabay
- View weather icons on forecast
- Select the starting point of the trip from the drop down date picker

## API's used

You'll need to sign up for 3 API keys/IDs if you don't have them already:
[Geonames](https://www.geonames.org/)
[Weatherbit](https://www.weatherbit.io/api)
[Pixabay](https://pixabay.com/api/docs) [Algolia](https://community.algolia.com/places/documentation.html)

- by creating a `.env` file, and assigning the following variables accordingly we can prevent the privacy breach that would happen if we directly used the API instead.
- g_key       
- w_key     
- p_key        
- algolia_ID    
- algolia_KEY  
Also, we can define a port to run the server in this file if we wish to change the server port from 8626

## Getting the project running

Run `npm i` to use the node environment, and `npm run build` to start the webpack. Finally run `npm start` to start the app

Preview of the app

https://user-images.githubusercontent.com/58583793/113761914-9f80a080-9735-11eb-94bf-bdc7f2a56bb6.mov


